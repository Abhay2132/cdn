async function runAcss(){let acssBody;localStorage.getItem("acss")?acssBody=localStorage.getItem("acss"):(acssBody=await fetch("http://localhost:9000/acss.min.js"),acssBody=await acssBody.text(),localStorage.setItem("acss",acssBody),console.log("fetched acss from cdn -> localStorage")),acssBody&&eval(acssBody)}runAcss();