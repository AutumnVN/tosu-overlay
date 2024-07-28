(function connect() {
    const ws = new WebSocket('ws://localhost:24050/websocket/v2');
    ws.addEventListener('error', () => ws.close());
    ws.addEventListener('close', () => setTimeout(connect, 5000));
    ws.addEventListener('message', ({ data }) => onMessage(data));
})();

const pp = document.querySelector('#pp');
const ppFC = document.querySelector('#ppFC');
const ifFC = document.querySelector('#ifFC');
const ur = document.querySelector('#ur');
const urText = document.querySelector('#urText');
const h100 = document.querySelector('#h100');
const h100Small = document.querySelector('.h100 .small');
const h50 = document.querySelector('#h50');
const h50Small = document.querySelector('.h50 .small');
const h0 = document.querySelector('#h0');
const h0Small = document.querySelector('.h0 .small');
const sb = document.querySelector('#sb');
const sbSmall = document.querySelector('.sb .small');

function onMessage(data) {
    const json = JSON.parse(data);
    if (json.error) return;

    const { state, beatmap, play, performance, resultsScreen } = json;

    switch (state.name) {
        case 'Play':
            document.body.style.background = '#0000';
            pp.textContent = Math.round(play.pp.current);
            ppFC.textContent = Math.round(play.pp.fc);
            ifFC.style.display = !play.hits[0] && !play.hits.sliderBreaks ? 'none' : 'inline';
            ur.textContent = Math.round(play.unstableRate);
            urText.style.display = 'flex';
            h100.textContent = play.hits[100];
            h100Small.textContent = '100';
            h50.textContent = play.hits[50];
            h50Small.textContent = '50';
            h0.textContent = play.hits[0];
            h0Small.textContent = 'Miss';
            sb.textContent = play.hits.sliderBreaks;
            sbSmall.textContent = 'SB';
            break;
        case 'ResultScreen':
            document.body.style.background = '#000a';
            pp.textContent = Math.round(resultsScreen.pp.current);
            ppFC.textContent = Math.round(resultsScreen.pp.fc);
            ifFC.style.display = Math.round(resultsScreen.pp.current) === Math.round(resultsScreen.pp.fc) ? 'none' : 'inline';
            urText.style.display = 'none';
            h100.textContent = resultsScreen.hits[100];
            h100Small.textContent = '100';
            h50.textContent = resultsScreen.hits[50];
            h50Small.textContent = '50';
            h0.textContent = resultsScreen.hits[0];
            h0Small.textContent = 'Miss';
            sb.textContent = play.hits.sliderBreaks;
            sbSmall.textContent = 'SB';
            break;
        default:
            document.body.style.background = '#000a';
            pp.textContent = Math.round(performance.accuracy[100]);
            ifFC.style.display = 'none';
            urText.style.display = 'none';
            h100.textContent = Math.round(performance.accuracy[99]);
            h100Small.textContent = '99%';
            h50.textContent = Math.round(performance.accuracy[98]);
            h50Small.textContent = '98%';
            h0.textContent = Math.round(performance.accuracy[97]);
            h0Small.textContent = '97%';
            sb.textContent = Math.round(performance.accuracy[96]);
            sbSmall.textContent = '96%';
            break;
    }
}
