$('#submitComment').on('click', function() {

  let comment = $('#comment').val().trim()
  let articleID = $('#addCommentBtn').attr('data-id')

  $.post('/api/addComment', {
    comment: comment,
    articleID: articleID
  })
  .then(data => {
    console.log(data)
    $('#addCommentModal').toggle()
    $(".modal-backdrop").remove()
  })
})