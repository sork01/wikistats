# Wikistats
## Installation

### Install NodeJS and NPM
The line below is specific for Arch Linux, for other Linux-distributions please
find your own equivalent installation instructions for Node.JS and NPM.
```
$ sudo pacman -S nodejs npm
```
### Clone repository
```
$ git clone https://gerrit.wikimedia.org/r/analytics/wikipagestats
$ cd wikistats
```
### Install dependencies with bower & gulp
```
$ npm install
$ sudo npm install -g gulp
```
### Build wikistats
```
$ gulp watch
```
The project will be built in dist.
