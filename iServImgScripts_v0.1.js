// ==UserScript==
// @name         iServ imgs
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://gbr-monheim.de/iserv/exercise/manage/exercise/*/submission/show/*
// @match        https://gbr-monheim.de/iserv/exercise/manage/exercise/*
// @grant        none
// ==/UserScript==

const lightBoxStyles = `
<style>
.lightBoxLink {
cursor: pointer;
}

.row > .column {
  padding: 0 8px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Create four equal columns that floats next to eachother */
.column {
  float: left;
  width: 25%;
}

/* The Modal (background) */
.modal {
  display: none;
  position: fixed;
  z-index: 9999;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: black;
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  width: 90%;
  max-width: 1200px;
}

/* The Close Button */
.close {
  color: white;
  position: absolute;
  top: 60px;
  right: 25px;
  font-size: 35px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #999;
  text-decoration: none;
  cursor: pointer;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* Caption text */
.caption-container {
  text-align: center;
  background-color: black;
  padding: 2px 16px;
  color: white;
}

.active,
.demo:hover {
  opacity: 1;
}

img.hover-shadow {
  transition: 0.3s;
}

.hover-shadow:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#rotateButton {
cursor: pointer;
}

#lightBoxImage {
background: black;
}
</style>
`;

const linkTemplate=`
<a class="lightBoxLink"><span class="glyphicon glyphicon-search"></span></a>
`;

const lightBoxModal = `
<div id="lightBoxModal" class="modal">
  <span id="closeButton" class="close cursor">&times;</span>
  <div class="modal-content">
    <div class="caption-container">
      <h1 id="ligthBoxCaption"></h1>
<a id="rotateButton" class="btn btn-primary"><span class="glyphicon glyphicon-share-alt"></span>Rotate 90º</a>
    </div>
<div id="lightBoxImage">
</div>
    </div>
</div>`;

// Open the Modal
function openModal(userName, link) {
    angle = 0;
     $("#ligthBoxCaption").text(userName);
    $("#lightBoxImage").html('<img src="'+link+'" style="width:100%">');
  document.getElementById("lightBoxModal").style.display = "block";
}

// Close the Modal
function closeModal() {
  document.getElementById("lightBoxModal").style.display = "none";
}

function addLightBoxLinks(isList) {
    let userName = '';
    if(!isList) {
        userName = $('a[data-name]').text().trim();
    }

    $('td > a').map(function() {
        const route = $(this).attr('href');
        const fileName = $(this).text();
        let name = userName;

        if(route.indexOf('file') > -1) {
            if(isList) {
                name = $(this).parent().parent('tr').parent().parent().parent().parent().find("td:eq(1)").text() + ' | ';
            }
            $(this).parent().append(linkTemplate);

            if(name && name.length > 0) {name += ' | ';}
            $(this).parent().find("a.lightBoxLink").click(() => {openModal(name + fileName, route);});
        }
    });
}

let angle = 0;
function rotate() {
    angle += 90;
    $('#lightBoxImage img').css('transform','rotate(' + angle + 'deg)');
}

(function() {
    $("body").append(lightBoxStyles);
    $("body").append(lightBoxModal);
    $("#closeButton").click(() => {closeModal();});
    $("#rotateButton").click(() => {rotate();});
    addLightBoxLinks(window.location.href.indexOf('show') === -1);
})();
