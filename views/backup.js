doctype html
html
  head
    title Chat Application
    meta(charset='utf-8')
    meta(http-equiv='X-UA-Compatible', content='IE=edge')
    link(rel='stylesheet', href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css', integrity='sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M', crossorigin='anonymous')
    link(rel='stylesheet', href='stylesheets/style.css')
  body
    #nickname-container.container
      h1 Register for Chat Application
      span#nick-error
      form#choose-nickname
        input#nickname(type='text')
        input(type='submit', value='Register')
    #chat-container.container
      .row
        #users.col-md-4.col-sm-4.col-xs-12
          br
          h2 Users
        .clearfix.visible-xs
        #chat-col.col-md-8.com-sm-8.col-xs-12
          #room
            br
            h2 Chat Room
          #chat
          br
          .row
            .col-lg-9.col-md-9.col-xs-12
              input#message.form-control(type='text', placeholder='Type your message here...', autocomplete='off')
            .col-lg-3.col-md-3.col-xs-12
              button#chat-message.btn.btn-info.btn-block Send
    script(src='https://code.jquery.com/jquery-3.2.1.slim.min.js', integrity='sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN', crossorigin='anonymous')
    script(src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js', integrity='sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4', crossorigin='anonymous')
    script(src='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js', integrity='sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1', crossorigin='anonymous')
    script(type='text/javascript', src='/socket.io/socket.io.js')
    script(type='text/javascript', src='javascripts/chat-ui.js')
