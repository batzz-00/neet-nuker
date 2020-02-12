(() => {
    let neets = document.querySelectorAll(".deleted");
    neets.forEach(node => {
      let hidden
  
      let modComment = node.querySelector(".comment"); // Find comments within the comment (child)
      if(!modComment) return
      
      let author = modComment.getAttribute("data-author"); 
      if (!author || author !== "AutoModerator") return // If comment author exists and is not automoderator
      
      let modCommentChildren = modComment.querySelector(".child")
      let commentData = node.querySelector(".entry")  
  
  
      const triggerComment = status => {
        let parentStyle = status ? "height: 10px; overflow: hidden" : ""
        let style = status ? "height: 0px; overflow: hidden" : ""
        if(modCommentChildren.children.length === 0){
          modComment.parentElement.setAttribute("style", style);
          node.setAttribute("style", parentStyle)
        } else {
          let modCommentData = modComment.querySelector(".entry")
          modCommentData.setAttribute("style", style);
        }
        commentData.setAttribute("style", style);
        hidden = status
      }
      
      let spamNode = document.createElement("div")
      let textNode = document.createTextNode("2 comments hidden due to presumed spam, click to reopen")
      spamNode.setAttribute("style", "padding: 3px 0 3px 5px")
      spamNode.appendChild(textNode)
      
      node.prepend(spamNode);
  
      spamNode.onclick = () => {
        triggerComment(!hidden)
      }
      
      triggerComment(true)
    })
  })()