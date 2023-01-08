
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const header = $('header h2');
const thumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const ramdomBtn = $('.btn-random');
const reapeat =$('.btn-repeat');
const playlist =  $('.playlist');
const app = {
    currentIndex:0,
    isplaying:false,
    isramdom:false,
    isrepeat:false,
    songs: [
    {
        name: 'Always Remember Us This Way',
        singer: 'Lady Gaga',
        path: './assets/music/AlwaysRememberUsThisWay-LadyGaga-5693911.mp3',
        image: './assets/img/1.jpg'
    },
    {
        name: 'Shallow',
        singer: 'Lady Gaga',
        path: './assets/music/Shallow-Lady-Gaga_ Bradley-Cooper.mp3',
        image: './assets/img/2.jpg'
    },
    {
        name: 'I Never Love Again',
        singer: 'Lady Gaga',
        path: './assets/music/ILlNeverLoveExtendedVersionRadioEdit-LadyGaga-5693922.mp3',
        image: './assets/img/3.jpg'
    },
    {
        name: 'Heal Me',
        singer: 'Lady Gaga',
        path: './assets/music/healme.mp3',
        image: './assets/img/4.jpg'
    },
    {
        name: 'Before I Cry',
        singer: 'Lady Gaga',
        path: './assets/music/BeforeICry-LadyGaga-5693918.mp3',
        image: './assets/img/5.png'
    },
    {
        name: 'Too Far Gone',
        singer: 'Bradley Cooper',
        path: './assets/music/toofar.mp3',
        image: './assets/img/6.jpg'
    },
    {
        name: 'I love you 3000',
        singer: ' Stephanie Poetri',
        path: './assets/music/I-Love-You-3000-Chinese-Version-Jackson-Wang.mp3',
        image: './assets/img/7.jpg'
    },
    {
        name: 'Elwin Unstable',
        singer: '  Elwin',
        path: './assets/music/Imusic24H.Net-Unstable.mp3',
        image: './assets/img/8.jpg'
    },
    {
        name: 'I love you 3000',
        singer: ' Stephanie Poetri',
        path: './assets/music/I-Love-You-3000-Chinese-Version-Jackson-Wang.mp3',
        image: './assets/img/7.jpg'
    },
    {
        name: 'Elwin Unstable',
        singer: '  Elwin',
        path: './assets/music/Imusic24H.Net-Unstable.mp3',
        image: './assets/img/8.jpg'
    },
    {
        name: 'I love you 3000',
        singer: ' Stephanie Poetri',
        path: './assets/music/I-Love-You-3000-Chinese-Version-Jackson-Wang.mp3',
        image: './assets/img/7.jpg'
    },
    {
        name: 'Elwin Unstable',
        singer: '  Elwin',
        path: './assets/music/Imusic24H.Net-Unstable.mp3',
        image: './assets/img/8.jpg'
    }
    ],
   render: function(){
      
       const htmls = this.songs.map(function(song,index){
         
 
         return `<div class="song ${index === app.currentIndex ?'active': ''}" data-index="${index}">
         <div class="thumb" style="background-image: url('${song.image}')">
         </div>
         <div class="body">
             <h3 class="title">${song.name}</h3>
             <p class="author">${song.singer}</p>
         </div>
         <div class="option">
             <i class="fas fa-ellipsis-h"></i>
         </div>
     </div>`
     })

    playlist.innerHTML = htmls.join('');
   },
   defineProperties: function(){

    // Phương thức static Object.defineProperty()định nghĩa một thuộc tính mới trực tiếp trên 
    // một đối tượng hoặc sửa đổi một thuộc tính hiện có trên một đối tượng và trả về đối tượng.

        Object.defineProperty(this,'currentsong',{
            get: function (){
                return this.songs[this.currentIndex];
            }
        })
   },
   handerEvent: function(){
 
    const CDWidth = cd.offsetWidth;
    // console.log(CDWidth);
       document.onscroll = function(){
            const scrollTop = document.documentElement.scrollTop;
            const newWidth = CDWidth - scrollTop;
            cd.style.width = newWidth > 0 ? newWidth + 'px':0;
            cd.style.opacity = newWidth /CDWidth;
       }
      
   },
   
   loadCurrentSong: function(){
        // xủ lý bài hát đầu tiên
        const  _this = this;
        header.textContent = this.currentsong.name;
        thumb.style.backgroundImage =`url('${this.currentsong.image}')`;
        // xoay bài hát
        audio.src = this.currentsong.path;
        const cdAnimate = thumb.animate([
            {transform:`rotate(360deg)`}
        ],{
            duration:10000,
            iterations:Infinity
        });
        cdAnimate.pause();
        // sử lý khi play bài hát
        playBtn.onclick = function(){
            if(_this.isplaying){
                audio.pause();
            }
            else{
                audio.play();
            }

        }
        audio.onplay = function(){
            _this.isplaying = true;
            player.classList.add('playing');
           cdAnimate.play();

        }
        audio.onpause = function(){
            _this.isplaying = false;
            player.classList.remove('playing');
            cdAnimate.pause();
        }
        // Khi tiến đọ bài hát thay đổi
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPersen = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPersen;
                console.log(progress);
            }
        }
         // sử lý khi tua
        progress.onchange = function(e){
      
            const seek = audio.duration /100 * e.target.value;
            console.log(seek);
            audio.currentTime = seek;
         
        }
        nextBtn.onclick = function(){
            if(_this.isramdom){
                _this.playRamdomSong()
              
               
            }else{

                _this.nextSongs();
               
            }
            audio.play();
            _this.render();
            _this.SrollActiveSong();
        }
        prevBtn.onclick = function(){
            if(_this.isramdom){
                _this.playRamdomSong();
               
            }
            else{

                _this.PrevSongs();
              
            }
            audio.play();
            _this.render();
            _this.SrollActiveSong();
            
        }
        ramdomBtn.onclick = function(e){
            _this.isramdom = ! _this.isramdom;
            ramdomBtn.classList.toggle('active', _this.isramdom);

            // xử lý khi kết thúc audio
        }
        reapeat.onclick = function(e){
            _this.isrepeat = ! _this.isrepeat;
            reapeat.classList.toggle('active', _this.isrepeat);

            // xử lý khi kết thúc audio
        }
        audio.onended= function(){
            if(_this.isrepeat){
                audio.play();
            }
            else{

                nextBtn.click();
            }
        }
        // lắng nghe khi click vào bài hát
        playlist.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)');
            if(songNode || e.target.closest('.option')){
                if(songNode){
                    _this.currentIndex= songNode.dataset.index;
                    _this.loadCurrentSong();
                    audio.play();
                    _this.render();
                }
            }
        }

   },
   nextSongs: function(){
       this.currentIndex++;
       if(this.currentIndex >= this.songs.length ){
           this.currentIndex = 0;
       }
     this.loadCurrentSong() ;

   },
   PrevSongs: function(){
    this.currentIndex--;
    if(this.currentIndex <  0 ){
        this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
},
playRamdomSong: function(){
    let newIndex 
    do{
        newIndex = Math.floor(Math.random() * this.songs.length)
    }while(newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
},
SrollActiveSong: function(){
    setTimeout(() => {
        $('.song.active').scrollIntoView({
            behavior:'smooth',
            block:'nearest',
        })

    }, 300);
},

   start: function(){
        // lắng nghe các sự iện trong dom
       this.handerEvent();
          // định nghĩa các thuộc tính
       this.defineProperties();
       // tải bài hát đầu tiên vào UI
       this.loadCurrentSong();
      
       this.render()

       
   },
}
app.start();