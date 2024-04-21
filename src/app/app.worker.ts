addEventListener('message', ({ data }) => {
  let lotery = 0;
  let iteration = 0;
  while (((Math.sqrt(lotery)/2) + 15) != 50) {
    lotery = Math.round(Math.random()*100000);
    iteration++;
  }
  const response = `Trial ${iteration} and ${lotery}`;
  postMessage(response);
});
