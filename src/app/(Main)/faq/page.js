import React from 'react';
import { morgana } from '../layout';
import Join from '@/Shared/Join';
import getFaq from '@/lib/getFaq';
import Description from '../../../Components/FaqLink';

const FaqPage = async () => {
    const items = await getFaq();
    const categories = [...new Set(items?.map(item => item.category))];

    const data = (category) => {
        return items?.filter(item => item.category === category);
    }

    return (
        <div className=''>
            <div className='max-h-[750px] min-h-[550px] flex flex-col'>
                <div className='m-auto'>
                    <h1 className={`${morgana.className} text-center 2xl:text-9xl xl:text-7xl text-5xl text-white uppercase`}>GUIDES ⏐ FAQ</h1>
                </div>
            </div>
            <div className='bg-white 2xl:p-20 xl:p-20 p-6 rounded-t-[50px]'>
                {
                    categories?.map((category, i) => {
                        const d = data(category);
                        return (
                            <>
                                <h2 className={`${morgana.className} ${!i === 0 && 'mt-10'} uppercase text-center 2xl:text-7xl xl:text-5xl text-3xl`}>{category}</h2>
                                <div className='2xl:px-20 xl:px-14 px-6 grid 2xl:grid-cols-2 xl:grid-cols-2 grid-cols-1 2xl:mt-24 xl:mt-16 mt-10 2xl:gap-6 xl:gap-4 gap-y-6 mb-20'>
                                    {
                                        d?.map((item, i) => {
                                            return (
                                                <div style={{
                                                    boxShadow: "0px 5px 16px 0px rgba(8, 15, 52, 0.06)"
                                                }} key={i} className="collapse rounded-2xl bg-[#FFF] 2xl:px-7 2xl:py-10 xl:px-4 xl:py-7 h-fit">
                                                    <input type="checkbox" id={`${item.title}`} className="hidden" />
                                                    <label htmlFor={`${item.title}`} className="collapse-title cursor-pointer faq 2xl:text-[22px] xl:text-lg text-sm font-medium flex items-center justify-between">
                                                        {item.title}
                                                        <span className="icon-container ml-5">
                                                            <svg className="icon icon-plus" xmlns="http://www.w3.org/2000/svg" width="47" height="47" viewBox="0 0 47 47" fill="none">
                                                                <rect x="0.802734" y="0.493774" width="45.7867" height="45.7867" rx="8" fill="#FFE500" />
                                                                <path d="M23.5928 13.3075C22.9576 13.3075 22.4428 13.8223 22.4428 14.4575V32.3168C22.4428 32.9519 22.9576 33.4668 23.5928 33.4668H23.7994C24.4345 33.4668 24.9494 32.9519 24.9494 32.3168V14.4575C24.9494 13.8223 24.4345 13.3075 23.7994 13.3075H23.5928Z" fill="black" stroke="#6F6C90" stroke-width="0.3" stroke-linecap="round" />
                                                                <path d="M14.7666 22.1338C14.1315 22.1338 13.6166 22.6487 13.6166 23.2838V23.4904C13.6166 24.1255 14.1315 24.6404 14.7666 24.6404H32.6259C33.261 24.6404 33.7759 24.1255 33.7759 23.4904V23.2838C33.7759 22.6487 33.261 22.1338 32.6259 22.1338H14.7666Z" fill="black" stroke="#6F6C90" stroke-width="0.3" stroke-linecap="round" />
                                                            </svg>
                                                            <svg className="icon icon-minus hidden" xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
                                                                <rect x="0.195312" y="0.131775" width="45.7867" height="45.7867" rx="8" fill="#FFE500" />
                                                                <path d="M14.1582 21.7719C13.5231 21.7719 13.0082 22.2867 13.0082 22.9219V23.1285C13.0082 23.7636 13.5231 24.2785 14.1582 24.2785H32.0175C32.6526 24.2785 33.1675 23.7636 33.1675 23.1285V22.9219C33.1675 22.2867 32.6526 21.7719 32.0175 21.7719H14.1582Z" fill="black" stroke="#6F6C90" stroke-width="0.3" stroke-linecap="round" />
                                                            </svg>
                                                        </span>
                                                    </label>

                                                    <div className="collapse-content">
                                                        <Description description={item.description} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        )
                    })
                }
                <div>
                    <h2 className={`${morgana.className} mt-10 uppercase text-center 2xl:text-7xl xl:text-5xl text-3xl`}>AFS Games 2025 Rules and Regulations</h2>
                    <h3 className='my-6 text-2xl font-semibold'>Article 1: Organization</h3>
                    <p>
                        <span>
                            The company Foil and Co, headquartered at Zone Artisanale de Gorréquer, 29800 Pencran, France, is organizing an event named AFS Games, comprising several challenges (hereinafter referred to as “challenges”). The results will be accessible via a dedicated webpage.
                        </span>
                        <br />
                        <span className='mt-4 inline-block'>The disciplines concerned are: <strong>wingfoil, windfoil, downwind SUP foil, parawing, dockstart, and surf foil.</strong></span>
                    </p>
                </div>
                <div className='mt-8'>
                    <h3 className='my-6 text-2xl font-semibold'>Article 2: Participants</h3>
                    <p>
                        The AFS Games are open to any person over 14 years old (minors must provide explicit parental authorization via email to <strong>chloe.chaussy@foilandco.com</strong> using a pre-drafted text). All levels and statuses are accepted, provided that participation does not endanger the participant.
                        <br />
                        There is no limit to the number of participants per event.
                    </p>

                    <h3 className='my-6 text-2xl font-semibold'>Article 3: Registration Requirements</h3>
                    <p>
                        To participate, each participant must:
                    </p>
                    <ul className='list-disc list-inside ml-4'>
                        <li><strong>Own and use an AFS foil</strong> (mandatory upload of invoice) — the rest of the quiver is free.</li>
                        <li><strong>Register</strong> via the dedicated webpage by providing their last name, first name, email, and other requested information.</li>
                    </ul>

                    <h3 className='my-6 text-2xl font-semibold'>Article 4: Event Duration</h3>
                    <p>The AFS Games will take place <strong>from October 12 to November 16, 2025</strong>. Any participation outside this period will not be taken into account.</p>

                    <h3 className='my-6 text-2xl font-semibold'>Article 5: Objectives and Rules of the Challenges</h3>
                    <p>The objective is to spend the most time possible on the water in each discipline.</p>
                    <ul className='list-disc list-inside ml-4'>
                        <li>No electric assistance is permitted.</li>
                        <li>Downwind SUP foil is practiced exclusively with a paddle, and not as wingfoil freefly.</li>
                    </ul>

                    <h3 className='my-6 text-2xl font-semibold'>Article 6: Safety and Insurance</h3>
                    <ul className='list-disc list-inside ml-4'>
                        <li>Participants practice under their <strong>sole responsibility</strong> and with knowledge of the risks associated with their activity.</li>
                        <li>It is <strong>strongly recommended</strong> (and may be made mandatory by the organization) to have civil liability and/or accident insurance.</li>
                        <li>Foil and Co shall not be held liable for accidents, injuries, or damages occurring during the practice, even in case of organizational negligence, to the extent permitted by law.</li>
                        <li>Participants must comply with maritime safety rules and local weather conditions.</li>
                        <li>The organization reserves the right to disqualify participants who do not comply with safety rules.</li>
                    </ul>

                    <h3 className='my-6 text-2xl font-semibold'>Article 7: Force Majeure / Exceptional Conditions</h3>
                    <p>The organization reserves the right to modify, postpone, or cancel any challenge in case of exceptional conditions that could endanger the participants. These decisions are exclusively for the safety of the participants and do not entitle them to any compensation.</p>

                    <h3 className='my-6 text-2xl font-semibold'>Article 8: Data Submission and Verification</h3>
                    <ul className='list-disc list-inside ml-4'>
                        <li>Participants submit their GPS data via the dedicated webpage (date, time, location, track).</li>
                        <li>The data will be verified by the organization. In case of doubt regarding authenticity or fraud, the data may be deleted, and the participation disqualified.</li>
                        <li>Participants grant the organization the right to use the submitted data and content for promotional and communication purposes.</li>
                    </ul>

                    <h3 className='my-6 text-2xl font-semibold'>Article 9: Fair Play and Sanctions</h3>
                    <p>Any cheating or attempted fraud will result in <strong>immediate disqualification</strong> and the deletion of all uploaded data. The organization's decisions are final but may be contested via email to <strong>chloe.chaussy@foilandco.com</strong> within 5 days, with justification for the request.</p>

                    <h3 className='my-6 text-2xl font-semibold'>Article 10: Ranking and Prizes</h3>
                    <p>A <strong>ranking</strong> will be established for each challenge at the end of the AFS Games period. The highest-ranked participants will receive <strong>prizes</strong> specified on the dedicated webpage.</p>

                    <h3 className='my-6 text-2xl font-semibold'>Article 11: Withdrawal / Abandonment Procedures</h3>
                    <p>A participant may withdraw or abandon a challenge at any time. In this case, their account will be manually deleted. Personal and GPS data may be returned upon request.</p>

                    <h3 className='my-6 text-2xl font-semibold'>Article 12: Image Rights and Data Protection</h3>
                    <ul className='list-disc list-inside ml-4'>
                        <li>The collected personal information is exclusively for the organization and will not be shared with third parties.</li>
                        <li>The collection of personal data of minors is governed by law (GDPR).</li>
                        <li>Participants accept that photos or videos of the event may be used by the organization for communication purposes.</li>
                    </ul>

                    <h3 className='my-6 text-2xl font-semibold'>Article 13: Acceptance of the Rules</h3>
                    <p>Participation in the AFS Games implies <strong>unreserved acceptance</strong> of these rules. Any failure to comply will result in immediate disqualification.</p>

                    <h3 className='my-6 text-2xl font-semibold'>Article 14: Legal Notice and Applicable Texts</h3>
                    <p>These rules apply to international participants. The organization refers to the applicable texts: the French Sports Code (Code du sport), French Civil Code (Code civil français), GDPR, and local laws applicable to participants according to their country of residence.</p>

                    <h3 className='my-6 text-2xl font-semibold'>Article 15: Modification of the Rules</h3>
                    <p>The organization reserves the right to modify the rules at any time. Participants will be informed via the dedicated webpage.</p>
                </div>
                <div className='mt-8'>
                    <h2 className={`${morgana.className} mt-10 uppercase text-center 2xl:text-7xl xl:text-5xl text-3xl`}>AFS Games 2025 General Terms of Use (GTU)</h2>

                    <h3 className='my-6 text-2xl font-semibold'>1. Purpose</h3>
                    <p>
                        These General Terms of Use (GTU) govern access and participation in the AFS Games organized by the company Foil and Co (hereinafter "the Organization"). Any registration and participation implies full and unreserved acceptance of these GTU.
                    </p>

                    <h3 className='my-6 text-2xl font-semibold'>2. Registration and Participation</h3>
                    <ul className='list-disc list-inside ml-4'>
                        <li>Participation is open to any person aged over 14. Minors must provide a valid parental authorization, sent by email to <strong>chloe.chaussy@foilandco.com</strong>.</li>
                        <li>Registration is done online via the official AFS Games page.</li>
                        <li>Each participant must <strong>own an AFS foil</strong> (mandatory upload of invoice) and comply with safety conditions.</li>
                        <li>Participation is limited by the event's capacity, but no limit on the number of participants per event is imposed unless stated otherwise.</li>
                    </ul>

                    <h3 className='my-6 text-2xl font-semibold'>3. Rules of Participation</h3>
                    <ul className='list-disc list-inside ml-4'>
                        <li>Participants must comply with the specific rules of each event, submit authentic performances, and respect other participants.</li>
                        <li>No electric assistance is permitted.</li>
                        <li>For Downwind SUP foil, only paddling is authorized; wingfoil freefly is prohibited.</li>
                    </ul>

                    <h3 className='my-6 text-2xl font-semibold'>4. Safety and Liability</h3>
                    <ul className='list-disc list-inside ml-4'>
                        <li>Participants practice under their <strong>sole responsibility</strong> and with knowledge of the risks associated with water sports.</li>
                        <li>It is <strong>strongly recommended</strong>, and may be made mandatory, to have civil liability and/or accident insurance.</li>
                        <li>The Organization declines all responsibility in case of accidents, injuries, or damages occurring during the practice, even in case of negligence to the extent permitted by law.</li>
                        <li>Participants must comply with maritime safety rules and local weather conditions.</li>
                    </ul>

                    <h3 className='my-6 text-2xl font-semibold'>5. Data Submission and Use</h3>
                    <ul className='list-disc list-inside ml-4'>
                        <li>Participants must transmit their performance data (GPS, tracks, date, time, location) via the dedicated page.</li>
                        <li>The data will be verified by the Organization. In case of fraud or doubt regarding authenticity, the data may be deleted, and the participation disqualified.</li>
                        <li>Participants grant the Organization the right to use the submitted data and content for promotional and communication purposes.</li>
                    </ul>

                    <h3 className='my-6 text-2xl font-semibold'>6. Rankings and Prizes</h3>
                    <p>Rankings are established based on performances submitted and verified by the Organization. Participants may contest their ranking via email to <strong>chloe.chaussy@foilandco.com</strong> within 5 days, providing justification for their request. The Organization's final decisions remain sovereign.</p>

                    <h3 className='my-6 text-2xl font-semibold'>7. Image Rights and Personal Data Protection</h3>
                    <p>Participants accept that their images and performances may be used by the Organization for promotional purposes. Personal data is collected and processed in compliance with the <strong>GDPR</strong> and the French Data Protection Act (Loi Informatique et Libertés). Each participant has a right to access, rectify, and delete their data.</p>

                    <h3 className='my-6 text-2xl font-semibold'>8. Withdrawal and Abandonment</h3>
                    <p>A participant may withdraw or abandon a challenge at any time. In this case, their account will be manually deleted, and personal data may be returned upon request.</p>

                    <h3 className='my-6 text-2xl font-semibold'>9. Force Majeure and Exceptional Conditions</h3>
                    <p>The Organization reserves the right to postpone, modify, or cancel any challenge in case of exceptional conditions that could endanger participants. These decisions aim solely to ensure safety and do not entitle participants to any compensation.</p>

                    <h3 className='my-6 text-2xl font-semibold'>10. Modification of the GTU</h3>
                    <p>The Organization reserves the right to modify these GTU at any time. The modifications will be published on the official website and will apply immediately to participants.</p>

                    <h3 className='my-6 text-2xl font-semibold'>11. Applicable Texts and Jurisdiction</h3>
                    <p>These GTU are governed by the <strong>French Civil Code</strong>, the <strong>French Sports Code</strong>, the <strong>GDPR</strong>, as well as local laws applicable to participants according to their country of residence. Any dispute relating to the application of the GTU will be handled according to the competent jurisdictions in France or in accordance with local laws for international participants.</p>
                </div>
            </div>
            <Join />
        </div>
    );
};

export default FaqPage;