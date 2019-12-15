# Neuro Task Starter with Expfactory

This is an automated build for an Experiment Factory repository to 
serve the [neuro-task-starter](https://github.com/brown-ccv/neuro-task-starter) experiment. If you have a question
or issue, please [open it](https://github.com/brown-ccv/neuro-task-starter/issues)
at the upstream repository at brown-ccv.

## Detailed Usage

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
