function emailSender() {
    Email.send({
        Host : "s1.maildns.net",
        Username : "weston.shield.pro@gmail.com",
        Password : "A6BB34372D14D4472899C4ED2C94373C2704",
        To : 'dylanyehouenou344@gmail.com',
        From : "weston.shield.pro@gmail.com",
        Subject : "This is the subject",
        Body : "And this is the body"
    }).then(
      message => alert(message)
    );
}