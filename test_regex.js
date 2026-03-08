const displayedContent = `const developer = {
  name: "Ashish Kumar Nanda",
  role: "Full Stack Developer",
  languages: ["C++", "Python", "JavaScript", "TypeScript"],
  frameworks: ["React", "Node.js", "Express.js"],
  tools: ["Docker", "AWS", "Redis", "MongoDB"]
};`;

const highlighted = displayedContent
  // 1. First encode HTML entities to prevent any initial collision
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  // 2. Wrap Keywords
  .replace(/\b(const|let|var|function|return|import|export)\b/g, '<span class="text-[#c586c0]">$&</span>')
  // 3. Wrap booleans and nulls
  .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-[#569cd6]">$&</span>')
  // 4. Wrap Strings (Double quotes) - Avoid matching inside existing tags
  // We use a negative lookahead to ensure we aren't inside an HTML tag.
  .replace(/"([^"]*)"(?![^<]*>)/g, '<span class="text-[#ce9178]">"$&"</span>')
  // 5. Wrap Strings (Single quotes)
  .replace(/'([^']*)'(?![^<]*>)/g, '<span class="text-[#ce9178]">' + "$&" + '</span>')
  // 6. Wrap Object Keys
  .replace(/([a-zA-Z_]\w*):(?![^<]*>)/g, '<span class="text-[#9cdcfe]">$1</span>:');

console.log(highlighted);
