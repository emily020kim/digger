import Image from "next/image";
import doug from '../../public/winking.png';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';

export default function Faq() {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <div className="flex items-center mb-12 md:mb-20">
        <h1 className="text-lg md:text-3xl lg:text-4xl font-bold mr-2">Frequently asked questions</h1>
        <Image width={45} height={45} src={doug} alt="Character" />
      </div>

      <Accordion w={['90%', '80%', '60%']}>
        <AccordionItem>
          <h2 className="text-2xl font-bold">
            <AccordionButton _expanded={{ bg: '#FBB902', color: 'white' }}>
              <Box as='span' flex='1' textAlign='left'>
                Where do I go when I encounter an issue?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Please report issues to emily020kim@gmail.com &#40;the creator :3&#41; and we will try our best to fix it!
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2 className="text-2xl font-bold">
            <AccordionButton _expanded={{ bg: '#FBB902', color: 'white' }}>
              <Box as='span' flex='1' textAlign='left'>
                Are there any upcoming updates or features being added?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Yes, we will be adding weekly playlist curations by the end of this year along with 
            a point system to add friendly competition.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2 className="text-2xl font-bold">
            <AccordionButton _expanded={{ bg: '#FBB902', color: 'white' }}>
              <Box as='span' flex='1' textAlign='left'>
                How do I use Diggr?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            First, make sure to create and account and submit your first song! 
            The goal of this platform is to share and find new songs through the leaderboards, so make sure you
            take a good look around!
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}