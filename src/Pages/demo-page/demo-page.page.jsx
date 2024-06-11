import { useEffect } from 'react'
import './demo-page.style.scss'

//Importing the anime.js library
import anime from 'animejs/lib/anime.es';

//SVGs
import machineSVG from '../../assets/machine.svg';
import diveInBtnSVG from '../../assets/dive-in-button.svg';
import btnBaseSVG from '../../assets/btn-base.svg';
import leftEdge from '../../assets/edges/edge-left.svg';
import rightEdge from '../../assets/edges/edge-right.svg';
import topEdge from '../../assets/edges/edge-top.svg';
import bottomEdge from '../../assets/edges/edge-bottom.svg';

//Second Screen Content
import progressBar from '../../assets/content/progress.png';
import contentTitle from '../../assets/content/title.png';
import contentText from '../../assets/content/text.png';
import PrizeArcadeLogo from '../../assets/content/logo.png';
import ctaBtn from '../../assets/content/CTA-btn.svg';
import sprinkles from '../../assets/content/sprinkles.png';
import sprinkles2 from '../../assets/content/sprinkles2.png';

//Clouds
import cloud1 from '../../assets/content/clouds/cloud-1.png';
import cloud2 from '../../assets/content/clouds/cloud-2.png';
import cloud3 from '../../assets/content/clouds/cloud-3.png';

//Dinosaur
import dinosaur from '../../assets/content/dinosaur.png';

//Third Screen Content
import screen3Title from "../../assets/content/screen-3-title.png";
import screen3Text from '../../assets/content/screen-3-text.png';
import brick from '../../assets/content/brick.png';
import chestBox from '../../assets/content/chestbox.png';
import chestBoxImg from '../../assets/content/chestbox-img.png';

//Fires
import fire1 from '../../assets/content/fire-1.png';
import fire2 from '../../assets/content/fire-2.png';


function DemoPage() {

  const scaleUpMachineAnimation = {
    targets: '.machine',
    scale: 10,
    translateY: 60,
    loop: false,
    autoplay: false,
    duration: 250,
    easing: 'linear'
  };

  const dinoJumpAnimationTranslateYProp = [
    {value: -100, duration: 500},
    {value: 100, duration: 500, },

    {value: -50, duration: 500, },
    {value: 150, duration: 500, },

    {value: -20, duration: 500, },
    {value: 100, duration: 250, },

    {value: -80, duration: 500, },
    {value: 125, duration: 500, },

    {value: -50, duration: 500, },

  ];

  const dinoJumpAnimationTranslateXProp = [
    {value: 200, duration: 500},
    {value: 220, duration: 500, },

    {value: 420, duration: 500, },
    {value: 470, duration: 500, },

    {value: 700, duration: 500, },
    {value: 740, duration: 250, },

    {value: 900, duration: 500, },
    {value: 1000, duration: 500, },

    {value: 1200, duration: 500, },
  ];

  const dinoJumpAnimationOpacityProp = [
    {value: 1}, 
    {value: 1},
    {value: 1}, 
    {value: 1}, 
    {value: 0, duration: 500, delay: 2900},
  ];

  const fadeOutAnimation = (targets) => {
    return {
      targets: targets,
      opacity: [1, 0],
      background: '#000000',
      duration: 500,
      loop: false,
      autoplay: false,
    };
    
  };

  const fadeInAnimation = (targets) => {
    return {
      targets: targets,
      opacity: [0, 1],
      duration: 1000,
      loop: false,
      autoPlay: false,
    }
  }

  async function playDinosaurInitialAnimation() {
    var tl = anime.timeline(); // Changed

    tl.add({
      targets: '.dinosaur',
      translateX: 200,
      duration: 750,
      easing: 'linear',
      loop: false,
    }).add({
      targets: '.dinosaur',
      translateY: [
        {value: 0,},
        {value: -60, duration: 250,},
        {value: 0, duration: 250,},
      ],
      translateX: [
        {value: 200},
        {value: 370, duration: 500},
        {value: 700, duration: 500, delay: 500},
      ],
      // duration: 500,
      easing: 'linear', 
    })
    .add({
      targets: '.toggle-screen-2',
      opacity: [1, 0],
      duration: 500,
      easing: 'linear',
      loop: false,
    });

    await tl.finished;
    if(tl.completed) {
      tl.add(fadeInAnimation('toggle-screen-3')).play();
      // anime({
      //   targets: '.toggle-screen-3',
      //   opacity: [0, 1],
      //   duration: 250,
      //   loop: false,
      //   autoPlay: false,
      // })
      // showThirdScreenContent();
      toggleScreensSection('toggle-screen-3', 'screen-2', playDinosaurJumpingSequenceAnimation);
    }

  }

  function showChestBoxImg(chestBoxId) {
    const chestBox = window.document.getElementById(chestBoxId);
    chestBox.style.animation = 'fadeOutChestImg 1s linear normal forwards';
  }

  function triggerChestBoxAnimation() {
    const totalChesBoxes = 4;
    let intialDelay = 1000; //Specified in milliseconds 1000ms === 1s

    for (let i = 1; i <= totalChesBoxes; i++) {
      setTimeout(() => {
        showChestBoxImg(`chestImg-${i}`);
      }, intialDelay);
      intialDelay += 1000;
    }
  }

  function playDinosaurJumpingSequenceAnimation() {
    const tl = anime.timeline({loop: false, easing: 'cubicBezier(0,0,1,1)'});
    triggerChestBoxAnimation();

    tl.add({
      targets: '#dino-2',
      translateY: dinoJumpAnimationTranslateYProp,
      translateX: dinoJumpAnimationTranslateXProp,
      opacity: dinoJumpAnimationOpacityProp
    });

  }

  function randomCloudAnimation(target, direction, duration) {

    if(direction === 'left') {
      anime({
        targets: target,
        translateX: [
          {value: anime.random(0, -1000), duration: duration},
          {value: 0, duration: duration}
        ],
        easing: 'linear',
        autoplay: true,
        loop: true,
      });
    } else {
      anime({
        targets: target,
        translateX: [
          {value: anime.random(0, 1000), duration: duration},
          {value: 0, duration: duration}
        ],
        easing: 'linear',
        autoplay: true,
        loop: true,
      });
    }
    

  }

  function hideDiveInBtn() {
    const diveInBtnEle = window.document.getElementsByClassName('dive-in-btn')[0];
    const diveInBtnBaseEle = window.document.getElementsByClassName('btn-base')[0];

    diveInBtnEle.style.display = 'none';
    diveInBtnBaseEle.style.display = 'none';
  }

  function toggleScreensSection(screenToShow, screenToHide, animationToPlay) {
    const screenToShowEle = window.document.getElementsByClassName(screenToShow)[0];
    const screenToHideEle = window.document.getElementsByClassName(screenToHide)[0];
    screenToHideEle.style.display = 'none';
    screenToShowEle.style.display = 'block';

    if(animationToPlay) {
      setTimeout(() => {
        animationToPlay();
      }, 1000);
    }
  }

  function hideSecondScreenContent() {
    anime(fadeOutAnimation('.toggle-content'));
    toggleScreensSection('dinosaur', 'toggle-content', playDinosaurInitialAnimation)
  }

  useEffect(() => {

    anime.set('.machine', {
      translateY: "10%",
      scale: 1.8,
    });

    const diveInBtnEle = window.document.querySelector('.dive-in-btn');

    diveInBtnEle.addEventListener('click', async () => {
      var tl = anime.timeline({
        easing: 'linear',
        duration: 750
      });

      tl.add(scaleUpMachineAnimation).add(fadeOutAnimation('.screen-1')).play();
      hideDiveInBtn();

      await tl.finished;

      if(tl.completed) {
        tl.add(fadeInAnimation('.toggle-screen-2')).play();

        toggleScreensSection('toggle-screen-2', 'screen-1', null);
        randomCloudAnimation('.cloud-1', 'right', anime.random(10000, 50000));
        randomCloudAnimation('.cloud-2', 'left',  anime.random(10000, 50000));
        randomCloudAnimation('.cloud-3', 'right', anime.random(10000, 50000));
      }
      
    });

  },);

  return (
    <span className='demo-page'>
      {/* Screen 1 */}
      <div className='screen-1'>
        <img src={machineSVG} alt='machine-svg' className='machine' />
        <div className='btn-parent-div'>
          <div className='clip-div'>
            <button className='btn'><img src={diveInBtnSVG} alt='div-in-btn' className='dive-in-btn' /></button>
          </div>
          <img src={btnBaseSVG} alt='btn-base' className='btn-base' />
        </div>
      </div>
      
      {/* Screen 2 */}
      <div className='toggle-screen-2 screen-2'>
        <div className='first-layer'>
          <img src={leftEdge} alt='left-edge' className='left-edge' />
          <img src={rightEdge} alt='right-edge' className='right-edge' />
        </div>
        <div className='second-layer'>
          <img src={topEdge} alt='top-edge' className='top-edge' />
          <img src={bottomEdge} alt='bottom-edge' className='bottom-edge' />
        </div>
        <div className='third-layer'>
          {/* <img src={background} alt='background' className='background'/> */}
          <div className='background'>
            <img src={cloud1} alt='cloud1' className='cloud-1' />
            <img src={cloud2} alt='cloud2' className='cloud-2' />
            <img src={cloud3} alt='cloud3' className='cloud-3' />
            <span className='toggle-content'>
              <img src={progressBar} alt='progress-bar' className='progress-bar' />
              <img src={contentTitle} alt='content-title' className='content-title' />
              <img src={contentText} alt='content-text' className='content-text' />
              <img src={PrizeArcadeLogo} alt='prize-arcade-logo' className='prize-arcade-logo' />
              <img onClick={hideSecondScreenContent} src={ctaBtn} alt='cta-button' className='cta-btn' />
              <img src={sprinkles} alt='sprinkles' id='sprinkle-1' className='sprinkles' />
              <img src={sprinkles2} alt='sprinkles' id='sprinkle-2' className='sprinkles' />
            </span>
            <img src={dinosaur} alt='dinosaur' className='dinosaur' />
          </div>
        </div>
      </div>

      {/* Screen 3 */}
      <div className='toggle-screen-3 screen-3' >
          <div className='edges-layer'>
            <img src={leftEdge} alt='left-edge' className='left-edge' />
            <img src={rightEdge} alt='right-edge' className='right-edge' />
            <img src={topEdge} alt='top-edge' className='top-edge' />
            <img src={bottomEdge} alt='bottom-edge' className='bottom-edge' />
          </div>

          <div className='center-layer'>
            <img src={fire1} alt='fire-1' className='fire-1' />
            <img src={fire2} alt='fire-2' className='fire-2' />
            <img src={screen3Title} alt='screen-3-title' className='content-title' />
            <img src={screen3Text} alt='screen-3-text' className='content-text' />

            <img src={sprinkles} alt='sprinkles' className='sprinkles' id='sprinkle-1' />
            <img src={sprinkles2} alt='sprinkles' className='sprinkles' id='sprinkle-2' />

            <div className='chest-box-comp' id='chst-b-1'>
            <img src={chestBoxImg} alt='chest-box-img' id='chestImg-1' />
              <img src={chestBox} alt='chest-box' id='chest-1' />
              <div className='bricks-div' >
                <img src={brick} alt='brick' className='brick' />
                <img src={brick} alt='brick' className='brick' />
              </div>
            </div>

            <div className='chest-box-comp' id='chst-b-2'>
            <img src={chestBoxImg} alt='chest-box-img' id='chestImg-2' />
              <img src={chestBox} alt='chest-box' id='chest-1' />
              <div className='bricks-div' >
                <img src={brick} alt='brick' className='brick' />
                <img src={brick} alt='brick' className='brick' />
              </div>
            </div>

            <div className='chest-box-comp' id='chst-b-3'>
              <img src={chestBoxImg} alt='chest-box-img' id='chestImg-3' />
              <img src={chestBox} alt='chest-box' id='chest-1' />
              <div className='bricks-div' >
                <img src={brick} alt='brick' className='brick' />
                <img src={brick} alt='brick' className='brick' />
              </div>
            </div>

            <div className='chest-box-comp' id='chst-b-4'>
              <img src={chestBoxImg} alt='chest-box-img' id='chestImg-4' />
              <img src={chestBox} alt='chest-box' id='chest-1' />
              <div className='bricks-div' >
                <img src={brick} alt='brick' className='brick' />
                <img src={brick} alt='brick' className='brick' />
              </div>
            </div>

            <img src={dinosaur} alt='dinosaur' id='dino-2' className='dinosaur' />

          </div>
      </div>



    </span>
  );
}

export default DemoPage