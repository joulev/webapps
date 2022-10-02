require("readline")
  .createInterface({ input: process.stdin, output: process.stdout })
  .on("line", line => console.log(`::set-output name=msg::${line.split("\\n")[0]}`));
