import CyclingScrambleText from '@/components/CyclingScrambleText';
import VerletClothString from '@/components/VerletClothString';
import Button from '@/components/Button';

// Import assets properly from src/assets
import resumePDF from '@/assets/resume.pdf';
import linkedinIcon from '@/assets/linkedin.png';
import githubIcon from '@/assets/github.png';

function Home() {
  return (
    <div>
      <div className="Hero">
        <h1 className="greeting">Hi!, my name is</h1>
        <h1 className="name">Kushal Gadamsetty</h1>
        <h1 className="position">
          I{' '}
          <CyclingScrambleText
            words={['code', 'lift', 'build', 'learn', 'ship']}
            interval={2400} // 2.5 seconds between changes
            scrambleConfig={{
              speed: 0.3,
              scramble: 6,
              seed: 1,
              chance: 1,
              tick: 2,
              range: [65, 93][98, 122], // a-z
              overdrive: false,
            }}
          />
          .
        </h1>

        {/* <Button
          className="resume-button"
          variant="default"
          size="default"
          onClick={() => window.open(resumePDF, '_blank')}
        >
          Resume
        </Button> */}
      </div>
      <div className="strings">
        <VerletClothString
          position="78%"
          iconSrc={linkedinIcon}
          iconSize={32}
          stringLength={350}
          stringColor="#E2125F"
          stringWidth={3}
          onClick={() => window.open('https://linkedin.com/in/kushalgadamsetty', '_blank')}
        />

        <VerletClothString
          position="85%"
          iconSrc={githubIcon}
          iconSize={32}
          stringLength={450}
          stringColor="#E2125F"
          stringWidth={3}
          onClick={() => window.open('https://github.com/kushallg', '_blank')}
        />
      </div>
    </div>
  );
}

export default Home;
