const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlist = $("#list-song");

const imgSong = $(".info-song__img");
const nameSong = $(".info-song__name-song");
const singer = $(".info-song__name-singer");

const audio = $("#audio");
const volume = $(".process__voloumn");

const btn_Playing = $(".control__btn-playing");
const btn_sub_Playing = $(".func__btn-play");
const btn_sub_like = $(".js-btn-sub-like");
const btn_nextSong = $(".control__btn-right");
const btn_preSong = $(".control__btn-left");
const btn_isLoop = $(".control__btn-loop");
const btn_isRandom = $(".control__btn-random");

const progress = $(".control__progress");

const play_list = $("#list-song");

const app = {
  Playing: false,
  sub_like: false,
  id_currentSong: 0,
  isRandom: false,
  isLoop: false,
  songs: [
    {
      id: 0,
      name: "Cứ Chill Thôi",
      singer: "Dalab vs Hoàng Yến",
      path: "music/audio/CUCHILLTHOI.mp3",
      image: "music/img/chillthoi.jpg",
    },

    {
      id: 1,
      name: "Bước qua mùa cô đơn",
      singer: "Thái Vũ",
      path: "music/audio/BƯỚC QUA MÙA CÔ ĐƠN.mp3",
      image: "music/img/vũ.jpg",
    },

    {
      id: 2,
      name: "Ngày Mai Em đi",
      singer: "SooBin",
      path: "music/audio/NGÀY MAI EM ĐI.mp3",
      image: "music/img/soobin.jpg",
    },

    {
      id: 3,
      name: "Đâu cần một bài ca tình yêu",
      singer: "Tiên Tiên",
      path: "music/audio/DAUCANMOTBAICATINHYEU.mp3",
      image: "music/img/tientien.jpg",
    },

    {
      id: 4,
      name: "Thanh Xuân",
      singer: "Dalab",
      path: "music/audio/THANH XUAN.mp3",
      image: "music/img/dalab.jpg",
    },

    {
      id: 5,
      name: "Thích Quá Rùi Nà",
      singer: "Tling",
      path: "music/audio/Thích Quá Rùi Nà.mp3",
      image: "music/img/tling.jfif",
    },

    {
      id: 6,
      name: "Bước qua mùa cô đơn",
      singer: "Thái Vũ",
      path: "music/audio/BƯỚC QUA MÙA CÔ ĐƠN.mp3",
      image: "music/img/vũ.jpg",
    },

    {
      id: 7,
      name: "Bước qua mùa cô đơn",
      singer: "Thái Vũ",
      path: "music/audio/BƯỚC QUA MÙA CÔ ĐƠN.mp3",
      image: "music/img/vũ.jpg",
    },

    {
      id: 8,
      name: "Ngày Mai Em đi",
      singer: "SooBin",
      path: "music/audio/NGÀY MAI EM ĐI.mp3",
      image: "music/img/soobin.jpg",
    },

    {
      id: 9,
      name: "Đâu cần một bài ca tình yêu",
      singer: "Tiên Tiên",
      path: "music/audio/DAUCANMOTBAICATINHYEU.mp3",
      image: "music/img/tientien.jpg",
    },
  ],

  //render tat ca bai hat
  render: function () {
    const htmls = this.songs.map(function (song) {
      return `
            <li class="item-song" data-index="${song.id}">
                <div class="item-song__stt">
                    ${song.id}
                    <div class="item-song__icon-play">
                        <i class="fas fa-play"></i>
                    </div>
                </div>

                <div class="item-song__title">
                    <div class="item-song__detail">
                        <img src="${song.image}" alt="" class="item-song__img">

                        <div class="item-song__name">
                            <div class="item-song__name-song">
                                ${song.name}
                            </div>
                            <div class="item-song__name-singer">
                               ${song.singer}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="item-song__album">
                    ${song.name}
                </div>

                <div class="item-song__date">
                    22 thg 2 , 2013
                </div>

                <div class="item-song__time">
                    <div class="item-song__icon-like">
                        <i class="fas fa-heart"></i>
                    </div>
                   <div class="item-song__quantity-time">
                    4 : 20
                   </div>
                    <div class="item-song__icon-more">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>

            </li>
            `;
    });

    playlist.innerHTML = htmls.join("");
  },

  loadDashboard_Infirst: function () {
    imgSong.src = this.songs[0].image;
    nameSong.innerHTML = this.songs[0].name;
    singer.innerHTML = this.songs[0].singer;
    audio.src = this.songs[0].path;
  },

  // xu ly su kien trong Dom
  handleEvents: function () {
    // Ham tai xu dung trong Dom
    function activePlaying() {
      btn_Playing.classList.add("playing");
      btn_sub_Playing.classList.add("playing");
    }

    function removePlaying() {
      btn_Playing.classList.remove("playing");
      btn_sub_Playing.classList.remove("playing");
    }

    progress.defaultvalue = 0;
    var _this = this;

    // Su kien yeu thich tren sub header (bug)
    btn_sub_like.onclick = function () {
      if (!_this.sub_like) {
        btn_sub_like.classList.add("func__btn-like--active");
        _this.sub_like.sub_like = true;
      } else {
        btn_sub_like.classList.remove("func__btn-like--active");
        _this.sub_like.sub_like = false;
      }
    };

    // khi bai hat dươc play
    btn_Playing.onclick = function (e) {
      if (!_this.Playing) {
        activePlaying();
        audio.play();
        _this.Playing = true;
      } else {
        removePlaying();
        audio.pause();
        _this.Playing = false;
      }
    };

    // khi thoi luong bai hay thay doi
    audio.ontimeupdate = function () {
      const progressPersent = Math.floor(
        (audio.currentTime / audio.duration) * 100
      );
      progress.value = progressPersent;
    };

    // khi nguoi dung tua bai hat
    progress.onchange = function (e) {
      audio.currentTime = (e.target.value / 100) * audio.duration;
    };

    // khi nguoi dung thay doi volumn
    volume.onchange = function (e) {
      audio.volume = e.target.value / 100;
    };

    // Khi nguoi dung next bai hat tiep theo
    btn_nextSong.onclick = function () {
      if (_this.isRandom) {
        _this.id_currentSong = Math.floor(Math.random() * 10);
        _this.RenderDashboard(_this.id_currentSong);
        activePlaying();
        _this.Playing = true;
        audio.play();
      } else {
        _this.id_currentSong++;

        if (_this.id_currentSong < _this.songs.length - 1) {
          _this.RenderDashboard(_this.id_currentSong);
          activePlaying();
          _this.Playing = true;
          audio.play();
        } else {
          _this.id_currentSong = 0;
          _this.RenderDashboard(_this.id_currentSong);
          activePlaying();
          _this.Playing = true;
          audio.play();
        }
      }
    };

    // khi nguoi dung muon lui bai hat
    (btn_preSong.onclick = function () {
      if (_this.isRandom) {
        _this.id_currentSong = Math.floor(Math.random() * 10);
        _this.RenderDashboard(_this.id_currentSong);
        activePlaying();
        _this.Playing = true;
        audio.play();
      } else {
        _this.id_currentSong--;

        if (_this.id_currentSong < 0) {
          _this.id_currentSong = _this.songs.length - 1;
          _this.RenderDashboard(_this.id_currentSong);
          activePlaying();
          _this.Playing = true;
          audio.play();
        } else {
          _this.RenderDashboard(_this.id_currentSong);
          activePlaying();
          _this.Playing = true;
          audio.play();
        }
      }
    }),
      // khi nguoi dung muon ran dom bai hat
      (btn_isRandom.onclick = function () {
        if (!_this.isRandom) {
          btn_isRandom.classList.add("control__btn--active");
          _this.isRandom = true;
        } else {
          btn_isRandom.classList.remove("control__btn--active");
          _this.isRandom = false;
        }
      });

    // xu ly khi nguoi dung bat chuc nang phat lai 1 bai
    // check su kien onclick loop song
    btn_isLoop.onclick = function () {
      if (!_this.isLoop) {
        btn_isLoop.classList.add("control__btn--active");
        _this.isLoop = true;
      } else {
        btn_isLoop.classList.remove("control__btn--active");
        _this.isLoop = false;
      }
    };
    // check khi het bai hat
    audio.onended = function () {
      if (_this.isLoop) {
        audio.play();
      } else {
        btn_nextSong.click();
      }
    };

    
    // check su kien trong playlist
    playlist.onclick = function (e) {

      _this.deleteActive()

      var SongNode = e.target.closest(".item-song:not(.item-song--active)");
      if(SongNode) {
        _this.RenderDashboard(SongNode.dataset.index);
        SongNode.classList.add('item-song--active')
        activePlaying();
        _this.Playing = true;
        audio.play();
        console.log(document.querySelector('.item-song--active'))
      }
      else {
        document.querySelectorAll('.item-song--active').classList.remove('item-song--active');
      }
    };
  },

//render lai dashboard
RenderDashboard: function (idSong) {
  imgSong.src = this.songs[idSong].image;
  nameSong.innerHTML = this.songs[idSong].name;
  singer.innerHTML = this.songs[idSong].singer;
  audio.src = this.songs[idSong].path;
},

deleteActive: function() {
    if(document.querySelector('.item-song--active') !== null ) {
      document.querySelector('.item-song--active').classList.remove('item-song--active');
    }
},

  start: function () {
    //render
    this.render();

    // Lay bai hat dau tien
    this.loadDashboard_Infirst();

    //Lang nghe xu ly cac su kien cua DOM
    this.handleEvents();
  },
};

 app.start();
