# Neuro Task Starter with Expfactory

[![GitHub actions status](https://github.com/expfactory-experiments/neuro-task-starter/workflows/generate-static-experiment/badge.svg?branch=master)](https://github.com/expfactory-experiments/neuro-task-starter/actions?query=branch%3Amaster+workflow%3Agenerate-static-experiment)

This is an automated build for an Experiment Factory repository to 
serve the [brown-ccv/neuro-task-starter](https://github.com/brown-ccv/neuro-task-starter) experiment. If you have a question
or issue, please [open it](https://github.com/brown-ccv/neuro-task-starter/issues)
at the upstream repository at brown-ccv.

## Build Expfactory Container

While we typically build from the library, you can build an experiment factory container from this repository as follows:

```bash
$ mkdir -p /tmp/data
$ cd ../
$ docker run -v /tmp/data:/data -v $PWD/:/experiment vanessa/expfactory-builder build /experiment/neuro-task-starter
```

You'll then have your Dockerfile for your experiment container in /tmp/data. To build it:

```bash
$ cd /tmp/data
$ docker build -t expfactory/neuro-task-starter .
```

And then run the experiment!

```bash
$ docker run -p 80:80 expfactory/neuro-task-starter start
Database set as filesystem
Starting Web Server

 * Starting nginx nginx
   ...done.
==> /scif/logs/gunicorn-access.log <==

==> /scif/logs/gunicorn.log <==
[2019-12-15 18:36:25 +0000] [1] [INFO] Starting gunicorn 20.0.4
[2019-12-15 18:36:25 +0000] [1] [INFO] Listening at: http://0.0.0.0:5000 (1)
[2019-12-15 18:36:25 +0000] [1] [INFO] Using worker: sync
[2019-12-15 18:36:25 +0000] [35] [INFO] Booting worker with pid: 35
WARNING No user experiments selected, providing all 1
[2019-12-15 18:38:49,840] INFO in general: New session [subid] expfactory/884c24bd-f639-4e0e-b310-cb2f52a96b33
[2019-12-15 18:38:49,852] INFO in utils: [router] None --> neuro-task-starter [subid] expfactory/884c24bd-f639-4e0e-b310-cb2f52a96b33 [user] Vanessa
[2019-12-15 18:38:52,675] DEBUG in main: Next experiment is neuro-task-starter
[2019-12-15 18:38:52,676] INFO in utils: [router] neuro-task-starter --> neuro-task-starter [subid] expfactory/884c24bd-f639-4e0e-b310-cb2f52a96b33 [user] Vanessa
[2019-12-15 18:38:52,676] DEBUG in utils: Redirecting to /experiments/neuro-task-starter
[2019-12-15 18:38:52,693] DEBUG in utils: Rendering experiments/experiment.html
```

See the [experiment factory usage page](https://expfactory.github.io/usage) for more details on how to run
your container, including binding data, using databases, or custom variables.

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
