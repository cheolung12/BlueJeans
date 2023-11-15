import React from 'react';
import PageButtonSection from '../../components/Recruitment/Main/PageButtonSection';
import SelectRecruit from '../../components/Recruitment/Main/SelectRecruit';
import CardSection from '../../components/Recruitment/Main/CardSection';
import Paging from '../../components/Recruitment/Main/Paging';

export default function Recruitment() {
    return (
        <>
            <nav>
                <SelectRecruit />
            </nav>
            {/*

            <section>
                <CardSection />
            </section>
            <nav>
                <PageButtonSection />
            </nav>
             */}
            <Paging />
        </>
    );
}
