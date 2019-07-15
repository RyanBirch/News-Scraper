// $(document).on('click', '#submitComment', function() {

//   let comment = $('#comment').val().trim()
//   let articleID = $('#addCommentBtn').attr('data-id')

//   $.post('/api/addComment', {
//     comment: comment,
//     articleID: articleID
//   })
//   .then(data => {
//     console.log(data)
//     $('#addCommentModal').toggle()
//     $(".modal-backdrop").remove()
//   })
// })


// $(document).on('click', '#viewCommentsBtn', function() {
//   $('#commentsDisplay').html('')
//   let articleID = $(this).attr('data-id')

//   $.get(`/api/getComments/${articleID}`)
//   .then(data => {
//     console.log(data)
//     data.comments.forEach(item => {
//       document.getElementById('commentsDisplay').innerHTML += 
//       `
//         <p>${item.body}</p>
//       `
//     })
//   })
// })

$(document).on('click', '#submitComment', submitComment)
$(document).on('click', '#viewCommentsBtn', viewComments)


$(document).on('click', '#addCommentBtn', passID)

// pass current article id to modal so we know which article id to use
function passID() {
  $('#submitComment').attr('data-id', $(this).attr('data-id'))
}

// submit a comment 
function submitComment() {

  // get comment body and associated article id
  let comment = $('#comment').val().trim()
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
        <p>${item.body}</p>
      `
    })
  })
}