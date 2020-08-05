process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  let line;
  while ((line = process.stdin.read()) !== null) {
    console.log(line.split('').reverse().join(''));
  }
});
