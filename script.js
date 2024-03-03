document.getElementById('generateBtn').addEventListener('click', function() {
  var min = parseFloat(document.getElementById('minInput').value);
  var max = parseFloat(document.getElementById('maxInput').value);
  var count = parseInt(document.getElementById('countInput').value);
  var allowNegative = document.getElementById('allowNegative').checked;
  var allowDecimal = document.getElementById('allowDecimal').checked;
  var allowPercentage = document.getElementById('allowPercentage').checked;

  if (!allowNegative && min < 0) {
    alert('Negative numbers are not allowed. Please adjust your input.');
    return;
  }

  if (!allowDecimal) {
    min = Math.ceil(min); // Round min up to nearest integer
    max = Math.floor(max); // Round max down to nearest integer
  }

  if (allowPercentage) {
    min = allowDecimal ? min / 100 : Math.ceil(min / 100 * 100);
    max = allowDecimal ? max / 100 : Math.floor(max / 100 * 100);
  }

  var range = max - min + (allowDecimal ? 1 : 0); // Adjust range based on allowDecimal

  if (range <= 0) {
    alert('Maximum number must be greater than or equal to minimum number');
    return;
  }

  if (count > 10) {
    alert('Maximum number of generated numbers is 10');
    return;
  }

  var generatedNumbers = [];
  for (var i = 0; i < count; i++) {
    var randomNumber;
    if (allowDecimal) {
      randomNumber = (Math.random() * range) + min;
    } else {
      randomNumber = Math.floor(Math.random() * range) + min; // Ensure generated numbers are integers
    }
    var formattedNumber = allowPercentage ? randomNumber.toFixed(2) + '%' : randomNumber.toFixed(allowDecimal ? 2 : 0);
    generatedNumbers.push(formattedNumber); // Adjust decimal places and add '%' symbol based on allowDecimal and allowPercentage
  }

  var resultText = 'Generated Numbers: ' + generatedNumbers.join(', ');
  document.getElementById('result').innerText = resultText;
});
