<script lang="ts">
    import { onMount } from "svelte";
    import * as d3 from 'd3';
    import ProjectCard from "./ProjectCard.svelte";
    import ProjectRow from "./ProjectRow.svelte";

    import privacyHubImage from '$lib/assets/images/privacy_hub.png';
    import unityVrImage from '$lib/assets/images/unity_vr.jpg';
    import infovis from '$lib/assets/images/infovis.png';

    export let isMobile: boolean;
    export let spacingMiddle = 80;
    export let verticalSpacing: number;
    export let allImagesLoaded: () => void;

    let waiting = 2;

    const onLoad = (event: Event) => {
        console.log('loaded one img');
        waiting--;
        if (waiting === 0) {
            allImagesLoaded();
        }
    };

    onMount(() => {
        // set width of elements with class middle-spacer to the value of spacingMiddle
        d3.selectAll('.middle-spacer').style('width', `${spacingMiddle}px`);
    });
</script>

<div class="max-w-[1240px] mx-auto">
    <!--  PrivacyHub  -->
    <ProjectRow
        projectTitle="PrivacyHub"
        projectSubtitle="Master's Thesis"
        content={privacyHubImage}
        spacingMiddle={spacingMiddle}
        verticalSpacing={verticalSpacing}
        invert={true}
        isMobile={isMobile}
        onLoad={onLoad}
    >
        <div class="mt-4">
            Over the last few years, the usage of smart home systems has grown continuously, enhancing convenience and comfort in many households.
            However, recent research shows that smart devices bear the risk of exposing intimate data of the residents and most users are not equipped with the necessary knowledge or tools to monitor and manage privacy settings of their devices.
            <br><br>
            To address this issue, I developed PrivacyHub, a privacy-centered hub that allows users to switch between three different privacy modes: <span class="text-[#70b853]">Local</span>, <span class="text-[#f2a641]">Online</span>, and <span class="text-[#e05c49]">Online-Shared</span>.
            The Hub is designed to support commercial smart devices that implement the <a href="https://csa-iot.org/all-solutions/matter/" target="_blank">Matter standard</a>.
            For a detailed explanation and evaluation of the system, please refer to my master's thesis: <a href="https://drive.google.com/file/d/1qS-S8zFgc5B6aB6hSXEOV53u1T_wDUVO/view?usp=drive_link" target="_blank">Development and Evaluation of a Smart Home Privacy Hub</a>.
        </div>
    </ProjectRow>
    <!--  ConnectivityControl  -->
    <ProjectRow
        projectTitle="ConnectivityControl"
        projectSubtitle='Demo for "22nd International Conference on Mobile and Ubiquitous Multimedia" (MUM ’23)'
        content='https://www.youtube.com/embed/ME-2od-9ksc?si=tn-479-lkOqXEamX'
        isVideo={true}
        spacingMiddle={spacingMiddle}
        verticalSpacing={verticalSpacing}
        invert={false}
        isMobile={isMobile}
        onLoad={onLoad}
    >
        <div class="mt-4">
            ConnectivityControl originally started as a 16-people-project for a practical web development course, after which four of us got the chance to enhance and demonstrate it at the 22nd International Conference on Mobile and Ubiquitous Multimedia (MUM ’23).
            <br><br>
            The framework allows the users to set the connectivity level (<span class="text-[#e05c49]">Offline</span>, <span class="text-[#f2a641]">Access Point</span>, <span class="text-[#74b9ff]">Local Network</span>, or <span class="text-[#70b853]">Online</span>) of two devices that were built during this project as a proof of concept. The system also includes a local and an online web interface to control the devices.
            <br><br>
<!--            This project was the direct inspiration for my master's thesis project, PrivacyHub.<br>-->
            The publication can be found here: <a href="https://doi.org/10.1145/3626705.3631876" target="_blank">ConnectivityControl: A Model Ecosystem for Advanced Smart Home Privacy</a>
        </div>
    </ProjectRow>
    <!--  Unity ML  -->
    <ProjectRow
        projectTitle="Reinforcement Learning in Unity"
        projectSubtitle="Practical Course"
        content="https://www.youtube.com/embed/SEYbNer4YLo?si=EHeer1XBNMv36itG"
        isVideo={true}
        spacingMiddle={spacingMiddle}
        verticalSpacing={verticalSpacing}
        invert={true}
        isMobile={isMobile}
        onLoad={onLoad}
    >
        <div class="mt-4">
            In this practical course about machine learning and its application in the game engine <a href="https://unity.com/" target="_blank">Unity</a>, the goal was to develop a small game and to train the AI players in one week.
            <br><br>
            Since the theme was environmental damage, our group of four students came up with a game where <span class="text-[#ee8e43]">whale catchers</span> try to catch as many whales as possible, while <span class="text-[#379cf0]">police boats</span> try to prevent them from doing so.
            <br><br>
            Our main goals were creating satisfying, physics-based controls for the boats and of course training the AI players to act as a challenging opponents. Said controls were used by the AI players as well, which made the training process quite interesting.
            <br><br>
            The results can be seen in the video.
        </div>
    </ProjectRow>
    <!--  BBAlexa  -->
    <ProjectRow
        projectTitle="BBAlexa (Alexa on Wheels)"
        projectSubtitle='Practical Course'
        content='https://www.youtube.com/embed/0vEwpr4hfM0?si=dQn_GvortKeO8Gm0'
        isVideo={true}
        spacingMiddle={spacingMiddle}
        verticalSpacing={verticalSpacing}
        invert={false}
        isMobile={isMobile}
        onLoad={onLoad}
    >
        <div class="mt-4">
            The goal of this practical course was to teach the basics of electronics, circuit design, microcontroller programming, and physical prototyping.
            <br><br>
            We applied the acquired knowledge to build a spherical, drivable robot with alexa integration, which we named BBAlexa.
            <br><br>
            This project was a gateway to the world of physical prototyping and electronics for me and marked the beginning of my passion for hardware development.
            It was also the first time I worked with a 3D printer, which motivated me to buy one myself and to start designing and printing my own projects.
        </div>
    </ProjectRow>
    <!--  Unity VR  -->
    <ProjectRow
        projectTitle="VR Project in Unity"
        projectSubtitle='Practical Course'
        content={unityVrImage}
        spacingMiddle={spacingMiddle}
        verticalSpacing={verticalSpacing}
        invert={true}
        isMobile={isMobile}
        onLoad={onLoad}
    >
        <div class="mt-4">
            In this practical course, the focus was on developing a VR experience in Unity. In addition to that, we were tasked to integrate multiplayer and implement some controls via an EMG sensor, which measures muscle activity. The time frame for this project was one week.
            <br><br>
            Our group of four students decided to create a VR puzzle game inspired by the popular game <a href="https://store.steampowered.com/app/400/Portal/" target="_blank">Portal</a>. Two players have to escape rooms by solving puzzles together. The catch is that the players move around by teleporting the other player, which makes communication and coordination key to success. The EMG sensor was used to control the teleportation.
            <br><br>
            During this project, I learned a lot about VR development, multiplayer synchronization, and how to integrate hardware into a Unity project.
        </div>
    </ProjectRow>
    <!--  Unity VR  -->
    <ProjectRow
        projectTitle="Information Visualization"
        projectSubtitle='Lecture Project'
        content={infovis}
        spacingMiddle={spacingMiddle}
        verticalSpacing={verticalSpacing}
        invert={false}
        isMobile={isMobile}
        onLoad={onLoad}
    >
        <div class="mt-4">
            This lecture was about visualizing big data in an intuitive way. The goal of the final project was to create an interactive, single-page visualization of a huge dataset using <a href="https://d3js.org/" target="_blank">D3.js</a>. We were tasked to combine german patent application data including location and time from 1990 to 2014 with another dataset of our choice. Our group of three students decided to combine the patent data with the election results of german federal states.
            <br><br>
            You can find our result here: <a href="https://www.cip.ifi.lmu.de/~muellerdav/" target="_blank">Information Visualization</a>
        </div>
    </ProjectRow>
</div>