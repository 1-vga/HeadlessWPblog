import styles from './home.module.scss';
import { Layout } from '@/components/layout';
import { SectionOne } from '@/components/ui/section-one';
import { SectionTwo } from '@/components/ui/section-two';
import { SectionThree } from '@/components/ui/section-three';
import { SectionFour } from '@/components/ui/section-four';
import { SectionFive } from '@/components/ui/section-five';

const Home = ({ testimonials }) => {

    return <Layout title='Home' description='Some description for seo'>
        <div className={styles.home}>
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <SectionFour testimonials={testimonials} />
            <SectionFive />
        </div>
    </Layout>
}

export default Home;