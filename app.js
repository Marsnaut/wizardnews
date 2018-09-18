const express = require("express");
const morgan = require("morgan");
const app = express();
const postBank = require("./postBank.js");


app.use(morgan('dev'));

const posts = postBank.list();

const middleWare = express.static('public')
app.use(middleWare);


function getTime() {
  let dateNow = new Date.now();
  return dateNow;
}

app.get("/", (req, res) => res.send(html));


 app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
  const singlePost = `<!DOCTYPE html>
  <html>
  <head>
    <title>${post.title}</title>
    <link rel="stylesheet" href="/style.css" />
  
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
        <div class='news-item'>
          <p>
            <span class="news-position"> </span>${post.title}
            <small>(by ${post.name})</small>
           <div>
            <small> ${post.date} </small>
           </div>
          </p>
          <small class="news-info">
            ${post.content} 
          </small>
        </div>
    </div>
  </body>
  </html>`


  res.send(singlePost);
});


const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});


const html = `<!DOCTYPE html>
<html>
<head>
  <title>Wizard News</title>
  <link rel="stylesheet" href="/style.css" />

</head>
<body>
  <div class="news-list">
    <header><img src="/logo.png"/>Wizard News</header>
    ${posts.map(post => `
      <div class='news-item'>
        <p>
          <span class="news-position">${post.id}. ▲</span>${post.title}
          <small>(by ${post.name})</small>
        </p>
        <small class="news-info">
          ${post.upvotes} upvotes | ${post.date}
        </small>
      </div>`
    )}
  </div>
</body>
</html>`

