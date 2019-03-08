$(document).ready(() => {
  $('.view-comments').on('click', (event) => {
    const articleID = $(event.currentTarget).data('id');
    // alert($(event).currentTarget.data('id'));
    // console.log(articleID);
    $('#article-ID').text(articleID);
    $('#add-comment').attr('data-id', articleID);
    $('#article-comments').empty();
    $.getJSON(`/api/articles/${articleID}/comments`, (data) => {
      const { comments } = data[0];
      if (comments.length < 1) {
        $('#article-comments').append('No comments yet for this article');
      } else {
        console.log(comments);
        comments.forEach((comment) => {
          $('#article-comments').append(`<article>${comment.body}</article>`);
        });
      }
      console.log(data);
      $('#comment-modal').modal().show();
    });
  });

  $('#add-comment').on('click', (event) => {
    event.preventDefault();
    const articleID = $(event.currentTarget).data('id');
    const comment = { body: $('#comment-textarea').val() };
    $.post(`/api/articles/${articleID}/comments`, comment, (data) => {
      console.log(data);
    });
  });
});
