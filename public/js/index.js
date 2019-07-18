// pass current article id to modal so we know which article id to use
function pass_id_to_submit() {
  $('#submitComment').attr('data-id', $(this).attr('data-id'))
}

// pass article id to modal so we know which article we need to delete the ref from
function pass_id_to_delete() {
  $('#viewCommentsModal').attr('data-article-id', $(this).attr('data-id'))
}


// submit a comment 
function submitComment() {

  // get comment body and associated article id
  let comment = $('#comment').val().trim()
  $('#comment').val('')
  // let articleID = $('#addCommentBtn').attr('data-id')
  let articleID = $(this).attr('data-id')
  console.log(articleID)

  // post to back end
  $.post('/api/addComment', {
    comment: comment,
    articleID: articleID
  })
  .then(data => {
    console.log(data)
    // remove modal
    $('#addCommentModal').toggle()
    $(".modal-backdrop").remove()
  })
}


// view comments for a specific article
function viewComments() {

  // clear comments display in modal
  $('#commentsDisplay').html('')
  // grab associated article id
  let articleID = $(this).attr('data-id')

  // get comments for that article from back end
  $.get(`/api/getComments/${articleID}`)
  .then(data => {
    console.log(data)
    // loop through comments and add to modal display
    data.comments.forEach(item => {
      document.getElementById('commentsDisplay').innerHTML += 
      `
        <div>
          <li data-id="${item._id}">${item.body}</li>
          <button id="deleteComment" class="btn btn-danger">Delete</button>
        </div>
      `
    })
  })
}


// delete a comment
function deleteComment() {
  let thisDiv = $(this).parent('div')
  let commentID = $(this).siblings('li').attr('data-id')
  let articleID = $(this).parents('#viewCommentsModal').attr('data-article-id')


  $.ajax({
    url: `/api/deleteComment/${commentID}/${articleID}`,
    type: 'DELETE',
    success: function(data) {
      console.log(data)
      thisDiv.empty()
    },
    error: function(data) {
      console.log(data)
    }
  })
}


// delete all articles
function deleteArticles() {
  $.ajax({
    url: '/api/clear',
    type: 'DELETE',
    success: function() {
      $('#articleDiv').empty()
    } 
  })
}


$(document).on('click', '#submitComment', submitComment)
$(document).on('click', '#viewCommentsBtn', viewComments)
$(document).on('click', '#deleteComment', deleteComment)
$(document).on('click', '#addCommentBtn', pass_id_to_submit)
$(document).on('click', '#viewCommentsBtn', pass_id_to_delete)
$(document).on('click', '#clearArticles', deleteArticles)