
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

    //ドロワーメニュー
  $(".js-hamburger").click(function () {
    if($(".js-hamburger").hasClass("is-active")) {
      $(".js-hamburger").removeClass("is-active");
      $(".js-sp-nav").fadeOut(300);
  } else{
  $(".js-hamburger").addClass("is-active");
  $(".js-sp-nav").fadeIn(300);
    }
  });

  //PC幅にしたときハンバーガーメニュードロワーを閉じる
  $(window).resize(function () {
    if (window.matchMedia("(min-width: 768px)").matches) {
      $(".js-hamburger").removeClass("is-active");
      $(".js-sp-nav").fadeOut(300);
    }
});
//ハンバーガーメニュー展開時背景をスクロールさせない方法
$(".js-hamburger").click(function () {
  if ($("body").css("overflow") === "hidden") {
    $("body").css({ height: "", overflow: "" });
  } else {
    $("body").css({ height: "100%", overflow: "hidden" });
  }
});

  //メインビュースライド
    var swiper = new Swiper(".mySwiper", {
      loop: true,
      effect: "fade",
      speed: 3000,
      allowTouchMove: false,
      autoplay: {
        delay: 3000,
      },
    });

  //ヘッダーの背景色変更
  const header = $("#js-header");
    const hero = $("#js-mv");
    $(window).on("scroll", function () {
        console.log($(this).scrollTop());
        const heroHeight = hero.height();
        console.log("mv height:" + heroHeight);
        if ($(this).scrollTop() > heroHeight) {
            header.addClass("is-dark");
        } else {
            header.removeClass("is-dark");
        }
    });

   //Campaignスライド
   var swiper = new Swiper(".js-campaign-swiper", {
    slidesPerView: 1.01,
    spaceBetween: 24,
     autoplay: {
       delay: 3000,
     },
     speed: 1500,
    loop: true,
    centeredSlides: true,
    width: 280,
    breakpoints: {
      // 768px以上の場合
      768: {
       slidesPerView: 3.5,
       spaceBetween: 40,
       centeredSlides: false,
       width: 1265.5,
      }
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

//スクロールイベントでページトップボタンを表示/非表示
$(function() {
  $(".js-page-top").hide();
  $(window).on("scroll", function() {
      if ($(this).scrollTop() > 100) {
          $(".js-page-top").fadeIn();
          } else {
          $(".js-page-top").fadeOut();
      }

      const scrollHeight = $(document).height();/*ページ全体の高さ*/
      const scrollPosition = $(window).height() + $(window).scrollTop();/*ページの一番上からスクロールされた距離*/
      const footHeight = $('footer').outerHeight();/*フッターの高さ*/

      if ( scrollHeight - scrollPosition  <= footHeight ) {
          $(".js-page-top").css({
              "position":"absolute",
              "bottom": 16  + footHeight,
          });
      } else {
          $(".js-page-top").css({
              "position":"fixed",
              "bottom": "16px",
          });
      }
  });
   // ページトップに戻る処理を追加
   $(".js-page-top").on("click", function() {
    $("html, body").animate({ scrollTop: 0 }, 300);
});
});

  //背景色の後に画像やテキストが表示されるエフェクト
  //要素の取得とスピードの設定
  var box = $('.colorbox'),
  speed = 700;

  //.colorboxの付いた全ての要素に対して下記の処理を行う
  box.each(function(){
  $(this).append('<div class="color"></div>')
  var color = $(this).find($('.color')),
  image = $(this).find('img');
  var counter = 0;

  image.css('opacity','0');
  color.css('width','0%');
  //inviewを使って背景色が画面に現れたら処理をする
  color.on('inview', function(){
      if(counter == 0){
       $(this).delay(200).animate({'width':'100%'},speed,function(){
                 image.css('opacity','1');
                 $(this).css({'left':'0' , 'right':'auto'});
                 $(this).animate({'width':'0%'},speed);
              })
          counter = 1;
        }
   });
  });

  