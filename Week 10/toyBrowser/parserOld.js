let currentToken = null;
let currentAttribute = null;

let stack = [{type: "document", children: []}];

function emit(token) {
  console.log(token);
  if (token.type === "text")
    return;
  let top = stack[stack.length-1];
}

const EOF = Symbol("EOF");

function data(char) {
  if(char === "<") {
    return tagOpen;
  } else if (char === EOF) {
    emit({
      type: "EOF"
    });
    return;
  } else {
    emit({
      type: "text",
      content: char
    });
    return data;
  }
}

function tagOpen(char) {
  if(char === "/") {
    return endTagOpen;
  } else if(char.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "startTag",
      tagName: ""
    };
    return tagName(char);
  } else {
    return;
  }
}

function endTagOpen(char) {
  if(char.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "endTag",
      tagName: ""
    };
    return tagName(char);
  } else if(char === ">") {
    //error
  } else if(char === EOF) {
    //error
  } else {
    //error
  }
}

function tagName(char) {
  if(char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if(char === "/") {
    return selfClosingStartTag;
  } else if(char.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += char;//.toLowerCase()
    return tagName;
  } else if(char === ">"){
    emit(currentToken);
    return data;
  } else {
    return tagName;
  }
}

function beforeAttributeName(char){
  if(char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if(char === "/" || char === ">" || char === EOF){
    return afterAttributeName(char);
  } else if(char === "=") {

  } else {
    currentAttribute = {
      name: "",
      value: ""
    }
    return attributeName(char);
  }
}

function attributeName(char) {
  if(char.match(/^[\t\n\f ]$/) || char === "/" || char === ">" || char === EOF) {
    return afterAttributeName(char);
  } else if(char === "=") {
    return beforeAttributeValue;
  } else if(char === "\u0000") {

  } else if(char === "\"" || char === "'" || char === "<") {

  } else {
    currentAttribute.name += char;
    return attributeName;
  }
}
function beforeAttributeValue(char) {
  if (char.match(/^[\t\n\f ]$/) || char === "/" || char === ">" || char === EOF) {
    return beforeAttributeValue;
  } else if (char === "\"") {
    return doubleQuotedAttributeValue;
  } else if(char === "\'") {
    return singleQuotedAttributeValue;
  } else if (char === ">") {

  } else {
    return UnquotedAttributeValue(char);
  }
}

function doubleQuotedAttributeValue(char) {
  if (char === "\"") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    console.log(33);
    emit(currentToken);
    return afterQuotedAttributeValue;
  } else if(char === "\u0000") {

  } else if (char === EOF) {

  } else {
    currentAttribute.value += char;
    return doubleQuotedAttributeValue;
  }
}

function singleQuotedAttributeValue(char) {
  if (char === "\'") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if(char === "\u0000") {

  } else if (char === EOF) {

  } else {
    currentAttribute.value += char;
    return singleQuotedAttributeValue;
  }
}

function afterQuotedAttributeValue(char) {
  if (char.match(/^[\t\n\f ]$/)){
    return beforeAttributeName;
  } else if(char === "/") {
    return selfClosingStartTag;
  } else if(char === ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if(c === EOF) {

  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function UnquotedAttributeValue(char) {
  if(char.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] =currentAttribute.value;

    return beforeAttributeName;
  } else if(char === "/") {
    currentToken[currentAttribute.name] =currentAttribute.value;
    return selfClosingStartTag;
  } else if(char === ">") {
    currentToken[currentAttribute.name] =currentAttribute.value;
    emit(currentToken);
    return data;
  } else if(char === "\u0000") {

  } else if(char === "\"" || char === "'" || char === "<" || char==="=" || char === "`") {

  } else if(char===EOF) {

  } else {
    currentAttribute.value += char;
    return UnquotedAttributeValue;
  }
}
function afterAttributeName(char) {
  if(char.match(/^[\t\n\f ]$/)){
   return afterAttributeName;
 }else if(char == "/"){
   return selfClosingStartTag;
 }else if(char == "="){
   return beforeAttributeValue;
 }else if(char == ">"){
   currentToken[currentAttribute.name]=currentAttribute.value;
   emit(currentToken);
   return data;
 }else if(char == EOF){

 }else{
   currentToken[currentAttribute.name]=currentAttribute.value;
   currentAttribute={
     name:"",
     value:""
   }
   return attributeName(char)
}
}
function selfClosingStartTag(char) {
  if(char === ">"){
    currentToken.isSelfClosing = true;
    return data;
  } else if(char === "EOF") {
  } else {
  }
}
module.exports.parseHTML = function parseHTML(html){
  let state = data;
  for (let char of html) {
    state = state(char);
  }
  state = state(EOF);
  //console.log(html);
}
