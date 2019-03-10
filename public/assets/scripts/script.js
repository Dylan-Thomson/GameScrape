function appendComment(comment) {
  let { body } = comment;
  body = body.replace(/</g, '&lt;');
  body = body.replace(/>/g, '&gt;');
  $('#article-comments').append(`<article class="my-2">${body}</article><hr>`);
}

$(document).ready(() => {
  $('.view-comments').on('click', (event) => {
    const articleID = $(event.currentTarget).attr('data-id');
    $('#article-ID').text(articleID);
    $('#add-comment').attr('data-id', articleID);
    $('#article-comments').empty();
    $.getJSON(`/api/articles/${articleID}/comments`, (data) => {
      const { comments } = data[0];
      if (comments.length < 1) {
        $('#article-comments').append('<h3>No comments yet for this article</h3>');
      } else {
        comments.forEach((comment) => {
          appendComment(comment);
        });
      }
      $('#comment-modal').modal().show();
    });
  });

  $('#add-comment').on('click', (event) => {
    event.preventDefault();
    const articleID = $(event.currentTarget).attr('data-id');
    const comment = { body: $('#comment-textarea').val() };
    $.post(`/api/articles/${articleID}/comments`, comment, (data) => {
      // Append new comment, clear textarea
      appendComment(data);
      $('#comment-textarea').val('');
    });
  });
});
