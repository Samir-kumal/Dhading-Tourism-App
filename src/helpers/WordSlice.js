export default function limitWords(description, maxWords) {
  const words = description.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ");
  }
  return description;
}
export  function limitWordsWithDot(description, maxWords) {
  const sentences = description.split("."); // Split the description into sentences
  const filteredSentences = sentences.filter(sentence => sentence.trim() !== ''); // Remove empty sentences (in case of multiple consecutive dots)

  if (filteredSentences.length > maxWords) {
    let accumulatedWords = 0;
    let result = "";
    for (const sentence of filteredSentences) {
      const wordsInSentence = sentence.split(" ");
      if (accumulatedWords + wordsInSentence.length > maxWords) {
        // If adding the current sentence would exceed the limit, break the loop
        break;
      } else {
        accumulatedWords += wordsInSentence.length;
        result += sentence.trim() + ". "; // Add the sentence with a dot
      }
    }
    return result.trim(); // Trim any trailing space before returning
  }

  return description;
}

export function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
