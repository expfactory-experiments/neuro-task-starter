# Neuro Task Starter with Expfactory

[![GitHub actions status](https://github.com/expfactory-experiments/neuro-task-starter/workflows/generate-static/badge.svg?branch=master)](https://github.com/expfactory-experiments/neuro-task-starter/actions?query=branch%3Amaster+workflow%3Agenerate-static)

This is an automated build for an Experiment Factory repository to 
serve the [neuro-task-starter](https://github.com/brown-ccv/neuro-task-starter) experiment. If you have a question
or issue, please [open it](https://github.com/brown-ccv/neuro-task-starter/issues)
at the upstream repository at brown-ccv.

## Build Expfactory Container

You can build an experiment factory container from this repository as follows:

```bash
$ mkdir -p /tmp/data
$ docker run -v /tmp/data:/data vanessa/expfactory-builder build https://github.com/expfactory-experiments/neuro-task-starter
$ cd /tmp/data
$ docker build -t expfactory/neuro-task-starter .
```

## Workflow Details

The following steps are run in a GitHub workflow, [generate-static.yml](.github/workflows/generate-static.yml) that
is run on a weekly basis to update the static files from the upstream. The static
files are updated, and are pushed to the master branch here. To step through this
process manually, you can do the following.

### 1. Build Container

A container (the [Dockerfile](Dockerfile)) is provided to help you with conversion. 
By default, it clones from `brown-ccv/neuro-task-starter` master branch however you can modify the
build to clone from a different branch or repository (typical for development). Here
is a custom build:

```bash
docker build --build-arg BRANCH=add/Dockerfile \
             --build-arg GITHUB_REPOSITORY=researchapps/neuro-task-starter \
             -t neuro-task-starter .
```

and here is using defaults:

```bash
$ docker build -t neuro-task-starter .
```

Note that we set the boolean `MTURK` and `EXPFACTORY` to true with an imperfect sed replacement - keep
this in mind if you modify the file `src/config/main.js`

```
RUN sed -i 's/const MTURK.*/const MTURK=true/' src/config/main.js
RUN sed -i 's/const EXPFACTORY.*/const EXPFACTORY=true/' src/config/main.js 
```

### 2. Generate Static Files

Next, create a folder for output

```bash
mkdir -p data/
```

And run the container with the folder bound to it. 

```bash
$ docker run -v $PWD/data:/data neuro-task-starter
```

The static files will be in your bound
folder to /data in the container after running it:

```bash
$ tree data/ -L 1
data/
├── index.html
└── static
```

The automated task will move these files to the root of the repository,
and update the master branch.

## How does it work?

The workflow takes the following environement variables:

  - **FROM_REPOSITORY**: The repository with the experiment. It should have javascript modified to export files for an Expfactory experiment, along with the `convert/expfactory-it` script. The Dockerfile for the experiment is maintained in the repository here.
  - **FROM_BRANCH**: The branch of the repository with the experiment to use.
  - **UPDATE_BRANCH**: The branch of this repository to push static files to (typically master)

Specifically, the logic works as follows:

 1. A global variable EXPFACTORY = true is added and exported from the `src/config/main.js` file.
 2. Logic is added to the main experiment App (App.js in the repository) to handle the case when EXPFACTORY is set to true, indicating that we save data to a /save endpoint, and finish the experiment by navigating to `/next`.
 3. The container here is built and clones the `${FROM_BRANCH}` of the `${FROM_REPOSITORY}`, sets `EXPFACTORY` and `MTURK` to true to ensure we aren't generating static files for electron, and installs the experiment (npm install). 
 4. The resulting container is then run, with entrypoint as `convert/expfactory-it` to generate static files to `/data` in the container.
 5. If `/data` is bound somewhere on the host (as it is in the automated action) we can then copy static files where we like.

And in the case of the GitHub Workflow, all of these steps are executed to update the master branch here. 
The experiment can then be built from it, or previewed.
