/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */
// import userInfoConnect from './login';
const Token = localStorage.getItem("Token");
const $postContainer = document.querySelector(".post-container");
const $userState = document.querySelector(".user-name-state");
const $logoutBtn = document.querySelector(".logout-btn");
const $logoutPopup = document.querySelector(".logout-popup");
const $logoutCheck = document.querySelector(".logout-check");
const $deletePop = document.querySelector(".delete-pop");
const $deletePopClose = $deletePop.querySelector(".modal-close");
const $deleteBtn = $deletePop.querySelector(".delete-btn");

let userInfo;
let postBoards;
// let slidePos = [];

function feedDomNodeSettings() {
  $logoutBtn.onclick = () => {
    $logoutPopup.classList.toggle("out-active");
  };
  $logoutCheck.onclick = (e) => {
    if (e.target.className == "logout-yes") {
      localStorage.removeItem("Token");
      window.location.href = "/login.html";
    } else {
      $logoutPopup.classList.toggle("out-active");
    }
  };
  function sliderHandler(e, posSet, length) {
    console.log(e);
    const $curImgBox = e.target.parentNode.previousElementSibling;
    const $iconParent = $curImgBox.parentNode.nextElementSibling;
    const targetPos = $curImgBox.getAttribute("data-pos");
    $curImgBox.setAttribute("data-pos", +targetPos + posSet);
    const pos = +targetPos + posSet;
    const $curController = $curImgBox.nextElementSibling;

    $curImgBox.style.left = `${pos * 100}%`;

    if (pos === 0) {
      $curController.querySelector(".slider-left-btn").style.visibility = "hidden";
      $curController.querySelector(".slider-right-btn").style.visibility = "visible";
    } else if (pos === -length) {
      $curController.querySelector(".slider-left-btn").style.visibility = "visible";
      $curController.querySelector(".slider-right-btn").style.visibility = "hidden";
    } else {
      $curController.querySelector(".slider-left-btn").style.visibility = "visible";
      $curController.querySelector(".slider-right-btn").style.visibility = "visible";
    }
    const $lightList = $iconParent.querySelectorAll(".item-light");
    $iconParent.querySelector(".active").classList.remove("active");
    $lightList[-pos].classList.add("active");
  }
  async function touchHandler(e) {
    let $parentPreviouss;
    let imgLength; //이미지 길이
    let $card; //클릭한 게시물에 대한 li(부모)노드를 식벽할 변수
    if (e.target.matches($postContainer.classList)) return;
    switch (e.target.className) {
      case "slider-left-btn":
        $card = e.target.parentNode.parentNode.parentNode;
        $parentPreviouss = e.target.parentNode.previousElementSibling;
        imgLength = $parentPreviouss.querySelectorAll("img").length - 1;
        if ($parentPreviouss.style.left === "0%") return;

        sliderHandler(e, 1, imgLength);
        break;
      case "slider-right-btn":
        $card = e.target.parentNode.parentNode.parentNode;
        $parentPreviouss = e.target.parentNode.previousElementSibling;
        imgLength = $parentPreviouss.querySelectorAll("img").length - 1;
        if ($parentPreviouss.style.left === `-${imgLength * 100}%`) return;
        sliderHandler(e, -1, imgLength);

        break;
      case "heart":
      case "heart active":
        $card = e.target.parentNode.parentNode.parentNode.parentNode;
        if (e.target.className === "heart") {
          e.target
            .querySelector("svg > path")
            .setAttribute(
              "d",
              "M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
            );
          const $heartAnim = document.createElement("div");
          $heartAnim.classList = "icon-heart active";
          $heartAnim.innerHTML = `
              <svg viewBox="-5 -28 521.00002 512" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m471.382812 44.578125c-26.503906-28.746094-62.871093-44.578125-102.410156-44.578125-29.554687 0-56.621094 9.34375-80.449218 27.769531-12.023438 9.300781-22.917969 20.679688-32.523438 33.960938-9.601562-13.277344-20.5-24.660157-32.527344-33.960938-23.824218-18.425781-50.890625-27.769531-80.445312-27.769531-39.539063 0-75.910156 15.832031-102.414063 44.578125-26.1875 28.410156-40.613281 67.222656-40.613281 109.292969 0 43.300781 16.136719 82.9375 50.78125 124.742187 30.992188 37.394531 75.535156 75.355469 127.117188 119.3125 17.613281 15.011719 37.578124 32.027344 58.308593 50.152344 5.476563 4.796875 12.503907 7.4375 19.792969 7.4375 7.285156 0 14.316406-2.640625 19.785156-7.429687 20.730469-18.128907 40.707032-35.152344 58.328125-50.171876 51.574219-43.949218 96.117188-81.90625 127.109375-119.304687 34.644532-41.800781 50.777344-81.4375 50.777344-124.742187 0-42.066407-14.425781-80.878907-40.617188-109.289063zm0 0" />
                </svg>`;
          $card.firstElementChild.nextElementSibling.appendChild($heartAnim);
          setTimeout(() => {
            $heartAnim.remove();
          }, 1500);
        } else {
          e.target
            .querySelector("svg > path")
            .setAttribute(
              "d",
              "M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
            );
        }
        const _likeCount = await axios
          .get(`boardDatas/${$card.id}`)
          .then((res) => res.data)
          .then((board) => board.likeCount)
          .catch((err) => console.error(err));
        const _likeList = await axios
          .get(`boardDatas/${$card.id}`)
          .then((res) => res.data)
          .then((board) => board.likeList.filter((item) => item.user !== userInfo.nickName));
        const payload = {
          likeCount: e.target.className === "heart active" ? _likeCount - 1 : _likeCount + 1,
          likeList: [
            ..._likeList,
            {
              user: userInfo.nickName,
              check: e.target.className === "heart active" ? false : true,
            },
          ],
        };
        axios.patch(`boardDatas/${$card.id}`, payload);
        e.target.classList.toggle("active");
        $card.querySelector(".count").textContent = ` ${payload.likeCount}개`;
        break;
      case "plus-text":
        const longTextContent = e.target.parentNode.nextElementSibling;
        longTextContent.style.height = longTextContent.scrollHeight + "px";
        e.target.remove();
        break;
      case "post-option":
        $card = e.target.parentNode.parentNode;
        $deletePop.classList.toggle("active");
        $deleteBtn.addEventListener("click", () => {
          axios.delete(`boardDatas/${$card.id}`);
          window.location.reload();
        });
        break;
      default:
        return;
    }
  }
  function deletePopToggle() {
    $deletePop.classList.toggle("active");
  }
  function feedEventBinds() {
    $postContainer.addEventListener("click", touchHandler);
    $deletePopClose.addEventListener("click", deletePopToggle);
  }
  feedEventBinds();
}

function createNode(tag, _class = "") {
  const node = document.createElement(tag);
  if (tag === "button" && _class === "heart") {
    node.innerHTML = `
    <svg fill="#ed4956;" height="22" viewBox="0 0 48 48" width="22">
    <path
      d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z">
    </path>
  </svg>`;
  } else if (tag === "button" && _class === "mark") {
    node.innerHTML = `
    <svg fill="#262626" height="22" viewBox="0 0 48 48" width="22">
    <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
  </svg>`;
  }
  node.className = _class;
  return node;
}

function postRender(board) {
  const {imgList} = board;

  // const { nickName, boards } = user;
  // const { likeCheck } = boards;
  const $postCard = createNode("li", "post-card"),
    $postHeader = createNode("div", "post-header"),
    $profileGroup = createNode("div", "profile-group"),
    $postOption = createNode("button", "post-option"),
    $profile = createNode("img", "profile"),
    $postNickName = createNode("p", "post-nickname"),
    $postImgContainer = createNode("div", "post-img-container"),
    $postImgbox = createNode("div", "post-imgbox"),
    $slideController = createNode("div", "slide-controller"),
    $sliderLeftBtn = createNode("button", "slider-left-btn"),
    $sliderRightBtn = createNode("button", "slider-right-btn"),
    $postContent = createNode("div", "post-content"),
    $postIconContainer = createNode("div", "post-icon-container"),
    $leftIcon = createNode("div", "left-icon"),
    $heart = createNode("button", "heart"),
    // $msg = createNode('button', 'msg'),

    $centerIcon = createNode("div", "center-icon"),
    $rightIcon = createNode("div", "right-icon"),
    // $mark = createNode('button', 'mark'),

    $postTextContainer = createNode("div", "post-text-container"),
    $heartText = createNode("p", "heart-text"),
    $count = createNode("span", "count"),
    $nick = createNode("p", "nick"),
    $hash = createNode("span", "hash"),
    $plusText = createNode("span", "plus-text"),
    $longText = createNode("div", "long-text");

  $postCard.id = board.id; //li에 id를 board에서 가져온 id로 재할당

  $profile.src =
    "https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_ohc=ZMRBdU8i2AoAX_wbci2&oh=12c3cd55d80ceadd2d32df292f236937&oe=5F13AC8F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2";

  $postNickName.textContent = board.by; //보드를 게시한 유저 닉네임 할당
  $profileGroup.appendChild($profile);
  $profileGroup.appendChild($postNickName);
  $postHeader.appendChild($profileGroup);
  if (userInfo.nickName === board.by) {
    $postOption.innerHTML = '<i class="far fa-trash-alt"></i>';
    $postHeader.appendChild($postOption);
  }
  $postImgbox.setAttribute("data-pos", 0);
  $postImgContainer.appendChild($postImgbox);
  imgList.forEach((img) => {
    //이미지 개수만큼 반복해서 이미지 노드를 생성하며 src에 할당
    const $postImg = createNode("img", "post-img");
    $postImg.src = img.src;
    $postImgbox.appendChild($postImg); //img
  });

  $sliderLeftBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
  $sliderRightBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
  $slideController.appendChild($sliderLeftBtn);
  $slideController.appendChild($sliderRightBtn);
  $postImgContainer.appendChild($slideController);
  const likeCheck = board.likeList.find((list) => list.user === userInfo.nickName);
  if (!likeCheck || !likeCheck.check) {
    $heart.classList.remove("active");
  } else {
    $heart.classList.add("active");
    $heart
      .querySelector("svg > path")
      .setAttribute(
        "d",
        "M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
      );
  }
  $leftIcon.appendChild($heart);
  // $leftIcon.appendChild($msg);
  $postIconContainer.appendChild($leftIcon);

  imgList.forEach(() => {
    //이미지 개수만큼 반복해서 깜빡이 노드를 생성
    if (imgList.length === 1) return;
    const $itemLight = createNode("div", "item-light"); //깜빡이 노드 생성
    $centerIcon.appendChild($itemLight); //position
    $centerIcon.firstElementChild.classList.add("active"); //이미지가 하나가 아닐
  });
  if (imgList.length > 1) {
    $centerIcon.firstElementChild.classList.add("active"); //이미지가 하나가 아닐 경우 첫 번째 깜빡이 노드에 클래스를 추가.
  } else {
    $slideController.remove(); //이미자가 하나일 경우 컨트롤러 제거
  }
  $postIconContainer.appendChild($centerIcon);

  // $markSvg.appendChild($markPath);
  // $mark.appendChild($markSvg)
  // $rightIcon.appendChild($mark);
  $postIconContainer.appendChild($rightIcon);

  $postContent.appendChild($postIconContainer);

  $heartText.textContent = `좋아요`;
  $count.textContent = ` ${board.likeCount}개`; //좋아요 개수
  $postTextContainer.appendChild($heartText);
  $heartText.appendChild($count);
  $nick.textContent = board.by; //닉네임
  $postTextContainer.appendChild($nick);
  // $hash.textContent = " #hash"; //해시
  !board.content ? ($plusText.textContent = "") : ($plusText.textContent = " 더 보기");
  $nick.appendChild($hash);
  $nick.appendChild($plusText);
  $longText.textContent = board.content; //메인 텍스트 영역
  $postTextContainer.appendChild($longText);
  $postContent.appendChild($postTextContainer);

  $postCard.appendChild($postHeader);
  $postCard.appendChild($postImgContainer);
  $postCard.appendChild($postContent);

  $postContainer.prepend($postCard);
}
async function getUser() {
  userInfo = await axios
    .get("/userDatas")
    .then((res) => res.data)
    .then((users) => users.find((user) => user.loginCheck === Token)) //로컬 스토리지 정보와 일치한지 확인한 후 있으면 userInfo에 객체로 할당
    .catch((err) => console.error(err));
  if (!userInfo) window.location.href = "./login.html"; //정상적인 값을 할당받지 못할 경우 로그인 페이지로 이동
  $userState.textContent = userInfo.nickName;
}
async function getBoard() {
  postBoards = await axios
    .get("/boardDatas") //보드 데이터 가져와서 할당
    .then((res) => res.data)
    .catch((err) => console.error(err));
  // postBoards.sort((a, b) => b.id - a.id); //최신순 정렬
  postBoards.forEach((board) => {
    // slidePos = [...slidePos, 0]; //보드 개수만큼 컨트롤러를 제어하는 배열에 0값을 추가 (각 보드 좌표값)
    postRender(board); //보드를 그려주는 Render 함수 호출
  });
  const grid = document.querySelector(".post-container");
  const iso = new Isotope(grid, {
    itemSelector: ".post-card",
  });
  gsap.from(".post-card", 1, {
    y: -60,
    opacity: 0,
    ease: "power1",
    stagger: {
      amount: 1.5,
    },
  });
}
// export default
export default async function feedInit() {
  getUser();
  getBoard();
  feedDomNodeSettings();
}
// feedInit();
