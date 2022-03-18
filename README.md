# Settlement reports to PostgreSQL
Convert DAX Excel settlement reports to PostgreSQL insert scripts to support tactical payment service migration.

## Prerequisites
- Node 16+

or:

- Docker
- Docker Compose

## Usage

1. create working folders at root level.

```
mkdir -p ./input
mkdir -p ./output
```

2. copy Excel files to `input` folder.  Filename should match target table in `public` schema

3. run application with `node app/index.js`

4. generated scripts are written to `output` folder

### Docker
To avoid the need for Node installation this application can also be run using Docker Compose.


A convenience `./scripts/start` script is provided for quick use.

This script accepts the following arguments:

- `--build` | `-b` - build container before running.  The container must be built at least once.
- `--watch` | `-w` - Run container in watch mode
- `--help` | `-h` - display help for running script

The container can also be built with `docker-compose build`.
