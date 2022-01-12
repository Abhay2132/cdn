function pop ( tag , tt = 200){
    var init_trans = tag.style.transition;
    tag.style.transition = "0.1s";
    tag.style.transform = "scale(0.9)";
    setTimeout(() => {
        tag.style.transform = "scale(1)";
        tag.style.transition = init_trans;
    }, tt)
}

function pressed ( tag , tt = 200){
    var init_trans = tag.style.transition;
    tag.style.transition = "0.1s";
    tag.style.transform = "translateY(2px)";
    setTimeout(() => {
        tag.style.transform = "translateY(0px)";
        tag.style.transition = init_trans;
    }, tt)
}

function type ( tag, txt , clear = true) {
	if (clear) tag.textContent = ""
	setTimeout ( ()=> {
		tag.textContent += txt[tag.textContent.length]
		if (tag.textContent.length < txt.length ) type(tag, txt, false); 
	}, 100)
}
