'use strict';

const TARGET = process.env.npm_lifecycle_event;
let env = 'development';

switch (TARGET) {
  case 'ios':
  case 'android':
    env = 'production';
}

module.exports = env;
