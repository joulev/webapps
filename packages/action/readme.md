# @joulev/action

Internal GitHub Action "script" to deploy the code in this repository to Vercel. Normally people would write normal workflows for that, but I found myself struggling too much with `bash`. So I decided to try writing a new action for once, using something I'm more confident about &ndash; JavaScript.

This action is not self-contained, i.e. `dist/index.js` does not contain all dependency code and it's necessary to run `npm install` (or similar) in this directory before using this action. I mean&hellip; I never intend to use this action anywhere else anyway.
