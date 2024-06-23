// Elements
const loadCommentsBtn = document.getElementById('load-comments-btn');
const commentSection = document.getElementById('comments');
const commentsForm = document.querySelector('#comments-form form');
const commentTitle = document.getElementById('title');
const commentText = document.getElementById('text');

function createCommentsList(comments) {
	const commentOrderList = document.createElement('ol');

	for (const comment of comments) {
		const commentList = document.createElement('li');

		commentList.innerHTML = `
			<article class="comment-item">
				<h2>${comment.title}</h2>
				<p>${comment.text}</p>
			</article>
		`;

		commentOrderList.appendChild(commentList);
	};

	return commentOrderList;
}

async function fetchCommentsList() {
	const postId = loadCommentsBtn.dataset.postid;

	try {
	const response = await fetch(`/posts/${postId}/comments`); // Return promises
		
		if(!response.ok) {
			alert('Fetching comments failed!');
		}

		const responseData = await response.json();

		if(responseData && responseData.length > 0) {
			const commentsList = createCommentsList(responseData);
	
			commentSection.innerHTML = '';
			commentSection.appendChild(commentsList);
		} else {
			commentSection.firstElementChild.textContent = 'We could not find any comments.'
		}
	} catch (error) {
		alert('Getting comments failed!');
	};
};

async function saveComment(event) {
	event.preventDefault();
	const postId = commentsForm.dataset.postid;

	const enteredTitle = commentTitle.value;
	const enterdText = commentText.value;

	const comment = {
		title: enteredTitle,
		text: enterdText
	};

	try {
		const response = await fetch(`/posts/${postId}/comments`, {
			method: 'POST',
			body: JSON.stringify(comment), // From Javascript object to JSON format
			headers: {
				'Content-Type': 'application/json'
			}
		});
	
		if (response.ok) {
			fetchCommentsList();
		} else {
			alert('Could not send comment!');
		}
	
	} catch (error) {
		alert('Could not send request.');
	}


	// console.log(enteredTitle);
	// console.log(enterdText);


};

loadCommentsBtn.addEventListener('click', fetchCommentsList);
commentsForm.addEventListener('submit', saveComment);