// Your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiY29saW5nZXJhZ2h0eSIsImEiOiJjbHc1N2lkbXExYWluMnFxamE5ejdtOGlkIn0.9g4c4GHKpHUj2yDhyK7UZA';

// Initialize the map
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: [2.3522, 48.8566], // starting position [lng, lat] (Paris)
    zoom: 12 // starting zoom
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Function to generate a random color
function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// Example locations array in the provided format
const locations = [
    {
        lat: 48.8724588022816,
        lng: 2.2992195611477877,
        momaUrl: "https://www.moma.org/collection/works/45986",
        googleMapsUrl: "https://www.google.com/maps/place/48°52'20.9%22N+2°17'57.2%22E/@48.8671162,2.2992196,714a,35y,39.25t/data=!3m1!1e3!4m4!3m3!8m2!3d48.8724588!4d2.2992196"
    },
    {
        lat: 48.86560751181969,
        lng: 2.321073382837031,
        momaUrl: "https://www.moma.org/collection/works/46011",
        googleMapsUrl: "https://www.google.com/maps/@48.8656428,2.3206989,3a,75y,73.5h,103.32t/data=!3m8!1e1!3m6!1sAF1QipO7jvEfdyOOKX5D2ozmdmtlbrd84hXiMQtIfktA!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipO7jvEfdyOOKX5D2ozmdmtlbrd84hXiMQtIfktA%3Dw203-h100-k-no-pi0.029552681-ya8.318013-ro-1.2251883-fo100!7i6080!8i3040"
    },
    {
        lat: 48.86320496176002,
        lng: 2.328358511749968,
        momaUrl: "https://www.moma.org/collection/works/46037",
        googleMapsUrl: "https://www.google.com/maps/place/48°51'47.5%22N+2°19'42.1%22E/@48.8634153,2.3273978,217m/data=!3m1!1e3!4m4!3m3!8m2!3d48.863205!4d2.3283585"
    },
    {
        lat: 48.86320496176002,
        lng: 2.328358511749968,
        momaUrl: "https://www.moma.org/collection/works/46063",
        googleMapsUrl: "https://www.google.com/maps/place/48°51'47.5%22N+2°19'42.1%22E/@48.8634153,2.3273978,217m/data=!3m1!1e3!4m4!3m3!8m2!3d48.863205!4d2.3283585"
    },
    {
        lat: 48.86320496176002,
        lng: 2.328358511749968,
        momaUrl: "https://www.moma.org/collection/works/46088",
        googleMapsUrl: "https://www.google.com/maps/place/48°51'47.5%22N+2°19'42.1%22E/@48.8634153,2.3273978,217m/data=!3m1!1e3!4m4!3m3!8m2!3d48.863205!4d2.3283585"
    },
    {
        lat: 48.86320496176002,
        lng: 2.328358511749968,
        momaUrl: "https://www.moma.org/collection/works/46124",
        googleMapsUrl: "https://www.google.com/maps/place/48°51'47.5%22N+2°19'42.1%22E/@48.8634153,2.3273978,217m/data=!3m1!1e3!4m4!3m3!8m2!3d48.863205!4d2.3283585"
    },
    {
        lat: 44.01801038403181,
        lng: 1.3528501487420201,
        momaUrl: "https://www.moma.org/collection/works/405323",
        googleMapsUrl: "https://www.google.com/maps/place/44°01'04.8%22N+1°21'10.3%22E/@44.018,1.3502862,647m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d44.018!4d1.3528611"
    },
    {
        lat: 48.85080642246692,
        lng: 2.3756570600445412,
        momaUrl: "https://www.moma.org/collection/works/46417",
        googleMapsUrl: "https://www.google.com/maps/place/48°51'02.9%22N+2°22'32.4%22E/@48.8518389,2.3748961,127a,35y,149.58h,45t/data=!3m1!1e3!4m4!3m3!8m2!3d48.8508064!4d2.3756571"
    },
    {
        lat: 48.85358551205987,
        lng: 2.3447553000015273,
        momaUrl: "https://www.moma.org/collection/works/58042",
        googleMapsUrl: "https://www.google.com/maps/place/Saint-Michel+Notre-Dame/@48.8533731,2.3443299,165m/data=!3m1!1e3!4m6!3m5!1s0x47e671e0f4eb210d:0x923cae18805384d0!8m2!3d48.8537267!4d2.3447553!16zL20vMDJqOHo5"
    },
    {
        lat: 48.8576336024299,
        lng: 2.3457145721929433,
        momaUrl: "https://www.moma.org/collection/works/405268",
        googleMapsUrl: "https://www.google.com/maps/place/L'Orangerie+-+Jardinerie+-+Salon+de+thé+-+Epicerie/@48.8576581,2.3457392,3a,90y,5.45h,90.42t/data=!3m6!1e1!3m4!1sRmkCoWCdqnxfP9uNO_t03w!2e0!7i16384!8i8192!4m12!1m5!3m4!2zNDjCsDUxJzI5LjEiTiAywrAyMCczOS45IkU!8m2!3d48.8580833!4d2.3444167!3m5!1s0x47e66f3dbba6f8e9:0x7854871c1672e44d!8m2!3d48.8577599!4d2.34561!16s%2Fg%2F11jccgsqq4"
    },
    {
        lat: 48.872905283231084,
        lng: 2.3591881840404083,
        momaUrl: "https://www.moma.org/collection/works/405270",
        googleMapsUrl: "https://www.google.com/maps/place/FATTOUMI+-+Centre+Sesame,+Acupuncture,+Energétique+chinoise,+Homéopathie/@48.8729053,2.3594779,295m/data=!3m1!1e3!4m12!1m5!3m4!2zNDjCsDUyJzIyLjUiTiAywrAyMSczMy4xIkU!8m2!3d48.8729053!4d2.3591882!3m5!1s0x47e66e0db76c4001:0x327dc9623e66f2ea!8m2!3d48.873052!4d2.359244!16s%2Fg%2F11b6hsdss3"
    },
    {
        lat: 48.87358166800715,
        lng: 2.444286665386785,
        momaUrl: "https://www.moma.org/collection/works/405273",
        googleMapsUrl: "https://www.google.com/maps/place/93100+Montreuil,+France/@48.863812,2.448451,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipPB2qAxyVhTw039_eFj16KwTOb3tPrsGLzEUdvL!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipPB2qAxyVhTw039_eFj16KwTOb3tPrsGLzEUdvL%3Dw203-h304-k-no!7i1031!8i1548!4m7!3m6!1s0x47e66d45530eef85:0xa3aa7c6db0c45bf0!8m2!3d48.861845!4d2.4465697!10e5!16zL20vMDJqYmpf"
    },
    {
        lat: 43.12072143919419,
        lng: 5.932977899882369,
        momaUrl: "https://www.moma.org/collection/works/405275",
        googleMapsUrl: "https://www.google.com/maps/place/43°07'14.1%22N+5°55'59.6%22E/@43.12194,5.9311932,185a,35y,132.17h,45t/data=!3m1!1e3!4m4!3m3!8m2!3d43.120592!4d5.9332235"
    },
    {
        lat: 42.80864696838206,
        lng: -70.86586061441419,
        momaUrl: "https://www.moma.org/collection/works/405305",
        googleMapsUrl: "https://www.google.com/maps/@42.8086808,-70.8660681,3a,75y,133.95h,90.29t/data=!3m7!1e1!3m5!1sIgiph2J0ldwQDmPoJwc9uQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3DIgiph2J0ldwQDmPoJwc9uQ%26cb_client%3Dsearch.gws-prod.gps%26w%3D86%26h%3D86%26yaw%3D115.21695%26pitch%3D0%26thumbfov%3D100!7i16384!8i8192"
    },
    {
        lat: 47.394659609129604,
        lng: 0.6823342784888706,
        momaUrl: "https://www.moma.org/collection/works/405057",
        googleMapsUrl: "https://www.google.com/maps/place/47°23'40.8%22N+0°40'56.4%22E/@47.3946944,0.6840261,127a,35y,270.35h,45t/data=!3m1!1e3!4m4!3m3!8m2!3d47.3946596!4d0.6823343"
    },
    {
        lat: 48.86138056883194,
        lng: 2.3448385327857197,
        momaUrl: "https://www.moma.org/collection/works/405077",
        googleMapsUrl: "https://www.google.com/maps/place/48°51'41.0%22N+2°20'41.4%22E/@48.8615937,2.348235,323a,35y,270h,39.39t/data=!3m1!1e3!4m4!3m3!8m2!3d48.8613889!4d2.3448333"
    },
    {
        lat: 48.93628968996187,
        lng: 2.3559490968331995,
        momaUrl: "https://www.moma.org/collection/works/405085",
        googleMapsUrl: "https://www.google.com/maps/place/Saint-Denis,+France/@48.935067,2.3595902,263a,35y,295.6h,44.91t/data=!3m1!1e3!4m6!3m5!1s0x47e66eaae7346d61:0xc7efebbaf928e90d!8m2!3d48.936181!4d2.357443!16zL20vMDF3dzV4"
    },
    {
        lat: 48.893441939136615,
        lng: 2.385181454239455,
        momaUrl: "https://www.moma.org/collection/works/405285",
        googleMapsUrl: "https://www.google.com/maps/place/Aubervilliers/@48.9051574,2.3768566,580m/data=!3m3!1e3!4b1!5s0x47e66c2f4c24ff39:0xcdcf44500a5bc6a8!4m6!3m5!1s0x47e66dd756f40caf:0x21aab64b300d8c31!8m2!3d48.9051574!4d2.3768566!16s%2Fg%2F11kpgh4d6m"
    },
    {
        lat: 47.214260387090896,
        lng: -1.5634656871213133,
        momaUrl: "https://www.moma.org/collection/works/405326",
        googleMapsUrl: "https://www.google.com/maps/place/47°12'51.3%22N+1°33'48.5%22W/@47.2142053,-1.5615881,127a,35y,270h,45t/data=!3m1!1e3!4m5!3m4!8m2!3d47.2142604!4d-1.5634657!10e5"
    },
    {
        lat: 48.85264953286066,
        lng: 2.302884113418925,
        momaUrl: "https://www.moma.org/collection/works/45941",
        googleMapsUrl: "https://www.google.com/maps/@48.8462738,2.2995518,854a,35y,39.21t/data=!3m1!1e3"
    },
    {
        lat: 45.901341248974695,
        lng: 6.12523255387029,
        momaUrl: "https://www.moma.org/collection/works/405269",
        googleMapsUrl: "https://www.google.com/maps/place/45°54'04.8%22N+6°07'30.8%22E/@45.8960512,6.1239815,770a,35y,39.14t/data=!3m1!1e3!4m11!1m6!3m5!2zNDXCsDU0JzA0LjgiTiA2wrAwNyczMC44IkU!8m2!3d45.9013333!4d6.1252222!10e5!3m3!8m2!3d45.9013333!4d6.1252222"
    },
    {
        lat: 48.87709401535688,
        lng: 2.2972090942689474,
        momaUrl: "https://www.moma.org/collection/works/405348",
        googleMapsUrl: "https://www.google.com/maps/place/48°52'37.5%22N+2°17'50.0%22E/@48.8760721,2.2983917,107a,35y,320.2h,45t/data=!3m1!1e3!4m4!3m3!8m2!3d48.877094!4d2.2972091"
    },
    {
        lat: 48.87169127825648,
        lng: 2.3718647123630174,
        momaUrl: "https://www.moma.org/collection/works/405079",
        googleMapsUrl: "https://www.google.com/maps/@48.8728781,2.3723464,127a,35y,193.66h,45t/data=!3m1!1e3"
    },
    {
        lat: 48.5900130211597,
        lng: 2.24860432435759,
        momaUrl: "https://www.moma.org/collection/works/405127",
        googleMapsUrl: "https://www.google.com/maps/@48.5900094,2.2485497,3a,75y,73.33h,84.46t/data=!3m6!1e1!3m4!1sWYt-ukACLiO6AxIxUxULFA!2e0!7i16384!8i8192"
    },
    {
        lat: 48.847578017906486,
        lng: 2.3715758326236926,
        momaUrl: "https://www.moma.org/collection/works/405139",
        googleMapsUrl: "https://www.google.com/maps/@48.8475594,2.3715418,3a,75y,209.4h,96.93t/data=!3m6!1e1!3m4!1st94-6A9l2xPuc4-k6fO_sw!2e0!7i16384!8i8192"
    },
    {
        lat: 48.83923268409225,
        lng: 2.3478872885112003,
        momaUrl: "https://www.moma.org/collection/works/405156",
        googleMapsUrl: "https://www.google.com/maps/@48.8394747,2.3481236,3a,44.5y,204.75h,94.25t/data=!3m6!1e1!3m4!1sSlefFmZvcR0CzAwofJHoiQ!2e0!7i16384!8i8192"
    },
    {
        lat: 48.88747483353858,
        lng: 2.319565383617295,
        momaUrl: "https://www.moma.org/collection/works/405182",
        googleMapsUrl: "https://www.google.com/maps/@48.8873864,2.3197491,3a,84y,307.43h,82.8t/data=!3m6!1e1!3m4!1smWlUul1KbmWn8ZwDVi9hjA!2e0!7i16384!8i8192"
    },
    {
        lat: 48.8658946363291,
        lng: 2.2823222282946345,
        momaUrl: "https://www.moma.org/collection/works/405358",
        googleMapsUrl: "https://www.google.com/maps/@48.8658329,2.282251,3a,37.5y,25.38h,89.06t/data=!3m6!1e1!3m4!1s9V7zSU5qdfbXMxmwf9kNWQ!2e0!7i16384!8i8192"
    },
    {
        lat: 48.902813837053934,
        lng: 2.3018384237961524,
        momaUrl: "https://www.moma.org/collection/works/405359",
        googleMapsUrl: "https://www.google.com/maps/@48.9027844,2.3019512,3a,75y,303.85h,83t/data=!3m6!1e1!3m4!1s0MGm-hhgXT1Waq1pWxgLVA!2e0!7i16384!8i8192"
    },
    {
        lat: 48.86791156547149,
        lng: 2.3539863681020052,
        momaUrl: "https://www.moma.org/collection/works/405149",
        googleMapsUrl: "https://www.google.com/maps/@48.8680853,2.3541171,3a,75y,191.47h,86.52t/data=!3m6!1e1!3m4!1sBICKgJjNIrPfem1vbjgYIw!2e0!7i16384!8i8192"
    },
    {
        lat: 48.893248551401264,
        lng: 2.3167810564384403,
        momaUrl: "https://www.moma.org/collection/works/405343",
        googleMapsUrl: "https://www.google.com/maps/@48.893137,2.3169488,3a,60y,331.05h,90.65t/data=!3m6!1e1!3m4!1sOcp_5BSdwmMglBx2kdBpGQ!2e0!7i16384!8i8192"
    },
    {
        lat: 48.876543069693994,
        lng: 2.295187653237706,
        momaUrl: "https://www.moma.org/collection/works/405344",
        googleMapsUrl: "https://www.google.com/maps/@48.8764267,2.2948683,3a,75y,52.12h,88.82t/data=!3m6!1e1!3m4!1se4RaRNAdvcdQuitV9av5cQ!2e0!7i16384!8i8192"
    },
    {
        lat: 48.87884072530128,
        lng: 2.322341253645482,
        momaUrl: "https://www.moma.org/collection/works/405349",
        googleMapsUrl: "https://www.google.com/maps/@48.878764,2.3222571,3a,57.3y,44.35h,93.96t/data=!3m6!1e1!3m4!1sRBMjBXZCq-OYczgoHDLpHA!2e0!7i13312!8i6656"
    },
    {
        lat: 48.86780929909038,
        lng: 2.3484743922794737,
        momaUrl: "https://www.moma.org/collection/works/405150",
        googleMapsUrl: "https://www.google.com/maps/@48.8678552,2.3482278,3a,75y,108.24h,68.84t/data=!3m6!1e1!3m4!1sYgIyy9q0eAyax6_srprb-A!2e0!7i16384!8i8192"
    },
    {
        lat: 48.887954383872156,
        lng: 2.32436889516843,
        momaUrl: "https://www.moma.org/collection/works/405172",
        googleMapsUrl: "https://www.google.com/maps/place/75+Av.+de+Clichy,+75017+Paris,+France/@48.888092,2.3245074,3a,75y,217.36h,94.33t/data=!3m6!1e1!3m4!1sF3Gh7cItgKEe_IqkqrXb4w!2e0!7i16384!8i8192!4m15!1m8!3m7!1s0x47e66fad4a50cc6d:0x9cd5795bb6bfcce1!2s75+Av.+de+Clichy,+75017+Paris,+France!3b1!8m2!3d48.8879733!4d2.3243922!16s%2Fg%2F11c43yt0hv!3m5!1s0x47e66fad4a50cc6d:0x9cd5795bb6bfcce1!8m2!3d48.8879733!4d2.3243922!16s%2Fg%2F11c43yt0hv?entry=ttu"
    },
    {
        lat: 48.869564076250974,
        lng: 2.3344484485853054,
        momaUrl: "https://www.moma.org/collection/works/405187",
        googleMapsUrl: "https://www.google.com/maps/@48.8694795,2.3346778,3a,75y,272.26h,83.67t/data=!3m7!1e1!3m5!1s50nTT5z2w2Jb62901klrGw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3D50nTT5z2w2Jb62901klrGw%26cb_client%3Dsearch.gws-prod.gps%26w%3D86%26h%3D86%26yaw%3D300.4901%26pitch%3D0%26thumbfov%3D100!7i16384!8i8192?entry=ttu"
    },
    {
        lat: 48.792231592777675,
        lng: 2.5140265409880027,
        momaUrl: "https://www.moma.org/collection/works/405189",
        googleMapsUrl: "https://www.google.com/maps/@48.7923182,2.5136602,3a,75y,99.94h,90t/data=!3m7!1e1!3m5!1s33HZp_-s2O3_9GRUgHAXkg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3D33HZp_-s2O3_9GRUgHAXkg%26cb_client%3Dsearch.gws-prod.gps%26w%3D86%26h%3D86%26yaw%3D99.94402%26pitch%3D0%26thumbfov%3D100!7i16384!8i8192?entry=ttu"
    },
    {
        lat: 48.867490896281915,
        lng: 2.3618451806922685,
        momaUrl: "https://www.moma.org/collection/works/405209",
        googleMapsUrl: "https://www.google.com/maps/@48.867423,2.3617119,3a,75y,190.73h,90.99t/data=!3m7!1e1!3m5!1s-fAdWHpzl8MGnONawqwgEg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3D-fAdWHpzl8MGnONawqwgEg%26cb_client%3Dsearch.gws-prod.gps%26w%3D86%26h%3D86%26yaw%3D181.20435%26pitch%3D0%26thumbfov%3D100!7i16384!8i8192?entry=ttu"
    },
    {
        lat: 48.88193098520372,
        lng: 2.2942026816324974,
        momaUrl: "https://www.moma.org/collection/works/405129",
        googleMapsUrl: "https://www.google.com/maps/@48.8879548,2.3245082,3a,75y,206.74h,85.66t/data=!3m6!1e1!3m4!1silghjfGJ-DbsjDp5ha0vew!2e0!7i16384!8i8192"
    },
    {
        lat: 48.885421406580456,
        lng: 2.3379629996681306,
        momaUrl: "https://www.moma.org/collection/works/405153",
        googleMapsUrl: "https://www.google.com/maps/@48.8879548,2.3245082,3a,75y,206.74h,85.66t/data=!3m6!1e1!3m4!1silghjfGJ-DbsjDp5ha0vew!2e0!7i16384!8i8192"
    },
    {
        lat: 48.89755410789457,
        lng: 2.33159939317477,
        momaUrl: "https://www.moma.org/collection/works/405154",
        googleMapsUrl: "https://www.google.com/maps/@48.8976255,2.3315235,3a,37y,161.77h,94.13t/data=!3m6!1e1!3m4!1sqeMt0dKlie9GXHw7EX8Eag!2e0!7i16384!8i8192"
    },
    {
        lat: 48.870753974299305,
        lng: 2.3426872253428295,
        momaUrl: "https://www.moma.org/collection/works/405230",
        googleMapsUrl: "https://www.google.com/maps/place/Zucchini/@48.8707492,2.3428367,3a,90y,282.98h,94.66t/data=!3m6!1e1!3m4!1s3OvQZpfd-6eFD8av3OLQnQ!2e0!7i16384!8i8192!4m16!1m9!3m8!1s0x47e66e3c327fdc49:0xde38bab02d262e91!2s157+Rue+Montmartre,+75002+Paris,+France!3b1!8m2!3d48.8707325!4d2.3426686!10e5!16s%2Fg%2F11csgr81nt!3m5!1s0x47e66e3c2d78dcc1:0xf7c88e19344936d6!8m2!3d48.8707616!4d2.3426813!16s%2Fg%2F11hkw6kdr8"
    },
    {
        lat: 48.888393047679294,
        lng: 2.284223996445877,
        momaUrl: "https://www.moma.org/collection/works/405254",
        googleMapsUrl: "https://www.google.com/maps/@48.8883811,2.2841381,3a,68.7y,52.95h,88.93t/data=!3m6!1e1!3m4!1sr_ewBJuf79y49X75RA1Z0g!2e0!7i16384!8i8192?entry=ttu"
    },
    {
        lat: 48.86732307894374,
        lng: 2.3222805871049714,
        momaUrl: "https://www.moma.org/collection/works/405309",
        googleMapsUrl: "https://www.google.com/maps/@48.8673066,2.3224054,3a,75y,269.66h,99.78t/data=!3m7!1e1!3m5!1s7HZVHadmkG08zY6ZxQ6PrQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3D7HZVHadmkG08zY6ZxQ6PrQ%26cb_client%3Dsearch.gws-prod.gps%26w%3D86%26h%3D86%26yaw%3D308.68314%26pitch%3D0%26thumbfov%3D100!7i16384!8i8192?entry=ttu"
    },
    {
        lat: 48.85348798570036,
        lng: 2.388418704142469,
        momaUrl: "https://www.moma.org/collection/works/405327",
        googleMapsUrl: "https://www.google.com/maps/@48.8531813,2.3879206,3a,53.9y,38.03h,87.56t/data=!3m7!1e1!3m5!1sSxYw3a74a39iHvkHQ_uDjA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3DSxYw3a74a39iHvkHQ_uDjA%26cb_client%3Dsearch.gws-prod.gps%26w%3D86%26h%3D86%26yaw%3D46.256184%26pitch%3D0%26thumbfov%3D100!7i16384!8i8192?entry=ttu"
    },
    {
        lat: 48.88319248418783,
        lng: 2.3142525007895953,
        momaUrl: "https://www.moma.org/collection/works/405339",
        googleMapsUrl: "https://www.google.com/maps/@48.883249,2.3143303,3a,75y,235.46h,89.34t/data=!3m7!1e1!3m5!1sArJraphWMYDSg-sI8p0rEQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3DArJraphWMYDSg-sI8p0rEQ%26cb_client%3Dsearch.gws-prod.gps%26w%3D86%26h%3D86%26yaw%3D209.93335%26pitch%3D0%26thumbfov%3D100!7i13312!8i6656?entry=ttu"
    },
    {
        lat: 48.84242546714551,
        lng: 2.337885614631387,
        momaUrl: "https://www.moma.org/collection/works/405369",
        googleMapsUrl: "https://www.google.com/maps/@48.8424973,2.3379951,3a,75y,224.07h,99.71t/data=!3m6!1e1!3m4!1s1bpeJVXTr132uO_GRxwRkQ!2e0!7i16384!8i8192?entry=ttu"
    },
    {
        lat: 48.86807551907759,
        lng: 2.3603970625527118,
        momaUrl: "https://www.moma.org/collection/works/405382",
        googleMapsUrl: "https://www.google.com/maps/@48.8682662,2.3605349,3a,62.9y,203.13h,88.59t/data=!3m7!1e1!3m5!1sBtpqWcL_g-vlL1Rtg-wVAQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3DBtpqWcL_g-vlL1Rtg-wVAQ%26cb_client%3Dsearch.gws-prod.gps%26w%3D86%26h%3D86%26yaw%3D210.11267%26pitch%3D0%26thumbfov%3D100!7i16384!8i8192?entry=ttu"
    },
    {
        lat: 48.859538427070696,
        lng: 2.3542382153319656,
        momaUrl: "https://www.moma.org/collection/works/405441",
        googleMapsUrl: "https://www.google.com/maps/@48.8690188,2.3681278,3a,75y,132.36h,82.92t/data=!3m6!1e1!3m4!1sztsNFRVsb1Y5NfHnd1nofw!2e0!7i16384!8i8192?entry=ttu"
    },
    {
        lat: 48.88176213537974,
        lng: 2.3165778351579402,
        momaUrl: "https://www.moma.org/collection/works/405345",
        googleMapsUrl: "https://www.google.com/maps/@48.8814484,2.3167389,3a,47.4y,-10.72h,90.55t/data=!3m7!1e1!3m5!1sAk4fqWoTDbHY5yTrSzzzaQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3DAk4fqWoTDbHY5yTrSzzzaQ%26cb_client%3Dsearch.gws-prod.gps%26w%3D86%26h%3D86%26yaw%3D2.6429303%26pitch%3D0%26thumbfov%3D100!7i16384!8i8192?entry=ttu"
    },
    {
        lat: 48.853936116971276,
        lng: 2.3384425714450074,
        momaUrl: "https://www.moma.org/collection/works/405405",
        googleMapsUrl: "https://www.google.com/maps/@48.853873,2.3383019,3a,75y,73.71h,106.4t/data=!3m6!1e1!3m4!1sUN77jocIej6nHHPzVWLrXA!2e0!7i16384!8i8192?entry=ttu"
    },
    {
        lat: 48.8280273494129,
        lng: 2.372360161081581,
        momaUrl: "https://www.moma.org/collection/works/405165",
        googleMapsUrl: "https://www.google.com/maps/@48.8281265,2.3722178,3a,75y,121.4h,87.71t/data=!3m6!1e1!3m4!1s405NjYpt-x15RU_LcgEhMA!2e0!7i16384!8i8192?entry=ttu"
    },
    {
        lat: 48.8607949693704,
        lng: 2.3058219375005273,
        momaUrl: "https://www.moma.org/collection/works/405340",
        googleMapsUrl: "https://www.google.com/maps/@48.8607003,2.3057223,3a,75y,85.54h,74.92t/data=!3m7!1e1!3m5!1sRs01vyE4_WgJvpw0_nlEuQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3DRs01vyE4_WgJvpw0_nlEuQ%26cb_client%3Dsearch.gws-prod.gps%26w%3D86%26h%3D86%26yaw%3D52.43924%26pitch%3D0%26thumbfov%3D100!7i16384!8i8192?entry=ttu"
    },
    {
        lat: 48.88395952463923,
        lng: 2.321423451816848,
        momaUrl: "https://www.moma.org/collection/works/405341",
        googleMapsUrl: "https://www.google.com/maps/@48.8838683,2.3216332,3a,75y,318.32h,87.85t/data=!3m6!1e1!3m4!1soeRrxsC2VFomFdhVM87pYQ!2e0!7i16384!8i8192?entry=ttu"
    },
    {
        lat: 48.86309947963117,
        lng: 2.370950020473315,
        momaUrl: "https://www.moma.org/collection/works/405399",
        googleMapsUrl: "https://www.google.com/maps/@48.863254,2.3709604,3a,57.3y,211.78h,97.4t/data=!3m6!1e1!3m4!1srTqfQzOFVZ959BqfrsmivA!2e0!7i16384!8i8192"
    },
    {
        lat: 48.884486463082595,
        lng: 2.316915026763215,
        momaUrl: "https://www.moma.org/collection/works/405352",
        googleMapsUrl: "https://www.google.com/maps/place/Music+Media+Consulting+-+Agence+Presse+Tous+Médias/@48.8845139,2.3170718,3a,90y,271.57h,84.13t/data=!3m6!1e1!3m4!1sPJBtDUDvHOhgnnDZTOO7yQ!2e0!7i16384!8i8192!4m16!1m9!3m8!1s0x47e66fb10a7b3a47:0x72a1f83f4ec3cbe1!2s31+Rue+Dulong,+75017+Paris,+France!3b1!8m2!3d48.8843024!4d2.3167134!10e5!16s%2Fg%2F11c2bx2tbk!3m5!1s0x47e66e52a6333ad3:0xa711426fa1acf94b!8m2!3d48.884379!4d2.3169301!16s%2Fg%2F12hv55gfq"
    },
    {
        lat: 48.886703955443565,
        lng: 2.3556160501627366,
        momaUrl: "https://www.moma.org/collection/works/405353",
        googleMapsUrl: "https://www.google.com/maps/place/FADEL+COUTURE/@48.8868348,2.3555412,3a,75y,215.56h,98.68t/data=!3m6!1e1!3m4!1saJRiNpiD1wB-Jq_WPKjI0A!2e0!7i16384!8i8192!4m15!1m8!3m7!1s0x47e66e6f80c0ab7d:0xa6970358e51e5e88!2sRue+Affre,+75018+Paris,+France!3b1!8m2!3d48.8862145!4d2.3556483!16s%2Fg%2F12gh50f_b!3m5!1s0x47e66e659d340001:0x16c5319f51b8309a!8m2!3d48.8868332!4d2.355438!16s%2Fg%2F11c31npk5g"
    },
    {
        lat: 48.86917346040822,
        lng: 2.3430507825360904,
        momaUrl: "https://www.moma.org/collection/works/405333",
        googleMapsUrl: "https://www.google.com/maps/place/VEGA+Investment+Managers/@48.8690767,2.3432022,3a,75y,276.3h,96.99t/data=!3m6!1e1!3m4!1sdcHQdHI7u30LsZg5xb-ixA!2e0!7i16384!8i8192!4m16!1m9!3m8!1s0x47e66e3daa34b777:0x16c48ca269b20fe6!2s123+Rue+Montmartre,+75002+Paris,+France!3b1!8m2!3d48.86902!4d2.3431044!10e5!16s%2Fg%2F11c2c6cgcw!3m5!1s0x47e66fc4db04406b:0xe685db4e8d996633!8m2!3d48.868769!4d2.3428875!16s%2Fg%2F11b6d29y3w"
    }
    
];

// Assign a random color to each location
locations.forEach(location => {
    location.color = getRandomColor();
});

// Add a layer for the circles
map.on('load', function() {
    // Add a data source containing GeoJSON data
    map.addSource('locations', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': locations.map(location => ({
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [location.lng, location.lat]
                },
                'properties': {
                    'momaUrl': location.momaUrl,
                    'googleMapsUrl': location.googleMapsUrl,
                    'color': location.color // Add the random color property
                }
            }))
        }
    });

    // Add a layer showing the circles
    map.addLayer({
        'id': 'locations',
        'type': 'circle',
        'source': 'locations',
        'paint': {
            'circle-radius': 6,
            'circle-color': ['get', 'color'], // Use the random color from the properties
            'circle-stroke-color': '#000',
            'circle-stroke-width': 1
        }
    });

    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: false
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'locations', function(e) {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'locations', function() {
        map.getCanvas().style.cursor = '';
    });

    // When a click event occurs on a feature in the locations layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on('click', 'locations', function(e) {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = `
            <p><a href="${e.features[0].properties.momaUrl}" target="_blank">MoMA Collection</a></p>
            <p><a href="${e.features[0].properties.googleMapsUrl}" target="_blank">View how it looks today</a></p>
        `;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });
});


