import Card from 'components/Card';
import Layout from 'modules/Embassy/components/Layout';
import Link from 'next/link';
import Loading from 'components/Loading';
import React from 'react';
import api from 'utils/api';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useRouter } from 'next/router';
import useSWR from 'swr';

dayjs.extend(localizedFormat);

const TermPage = ({}: {}) => {
  const router = useRouter();

  return <div>ok</div>;
  // return (
  //   <Layout title={`#${hashtag?.name} | Information Manipulation Analyzer`}>
  //     <div className="rf-container rf-mb-12w">
  //       <div className="rf-grid-row">
  //         <div className="rf-col">
  //           <div className="text-center rf-myw">
  //             <Link href="/">
  //               <a className="rf-link rf-fi-arrow-left-line rf-link--icon-left">Back</a>
  //             </Link>
  //           </div>
  //           <h1 className="text-center">#{hashtag?.name}</h1>
  //           <h6 className="text-center">
  //             Information Manipulation Analyzer
  //             <sup>
  //               <span
  //                 style={{
  //                   background: 'var(--rm500)',
  //                   color: 'white',
  //                   fontWeight: 'bold',
  //                 }}
  //                 className="rf-tag rf-tag--sm"
  //               >
  //                 BETA
  //               </span>
  //             </sup>
  //           </h6>
  //           {status === 'PENDING' && (
  //             <div className="text-center rf-my-12w">
  //               <span className="rf-tag">Your request is in the queue and will begin shortly</span>
  //             </div>
  //           )}
  //           {status === 'PROCESSING' && (
  //             <div className="text-center rf-my-12w">
  //               <span className="rf-tag">
  //                 Data is being extracted from twitter, please be patient
  //               </span>
  //             </div>
  //           )}
  //           {status === 'DONE_ERROR' && (
  //             <div className="text-center rf-my-12w">
  //               <span className="rf-text-color--error">
  //                 An error occured and processing stopped, please contact the administrator if you
  //                 need more data on this hashtag
  //               </span>
  //             </div>
  //           )}
  //           {loading && <Loading />}
  //         </div>
  //       </div>
  //
  //       <>
  //         {status === 'PROCESSING_PREVIOUS' && (
  //           <Loading size="sm" className="text-center rf-my-2w" />
  //         )}
  //
  //         <div className="text-center rf-text--xs rf-text-color--g500">
  //           <em>
  //             Crawled
  //             {status === 'PROCESSING_PREVIOUS' && (
  //               <>
  //                 {' '}
  //                 from{' '}
  //                 <strong>
  //                   {oldestProcessedDate
  //                     ? dayjs(oldestProcessedDate).format('llll')
  //                     : 'Searching...'}
  //                 </strong>
  //               </>
  //             )}
  //             {newestProcessedDate && (
  //               <>
  //                 {' '}
  //                 until{' '}
  //                 <strong>
  //                   {newestProcessedDate
  //                     ? dayjs(newestProcessedDate).format('llll')
  //                     : 'Searching...'}
  //                 </strong>
  //               </>
  //             )}
  //           </em>
  //         </div>
  //       </>
  //       <div className="rf-highlight rf-highlight--sm">
  //         <form onSubmit={handleSubmit}>
  //           <div className="rf-input-group">
  //             <label className="rf-label" htmlFor="text-input-hint">
  //               Be alerted by email
  //               <span className="rf-hint-text">
  //                 Whenever <strong>#{hashtag?.name}</strong> has an abnormal rise in number of
  //                 tweets
  //               </span>
  //             </label>
  //             <input
  //               className="rf-input"
  //               type="email"
  //               id="text-input-hint"
  //               name="text-input-hint"
  //               placeholder="Enter your email here"
  //             />
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //     {totalNbTweets > 0 && (
  //       <div className="rf-container rf-container-fluid">
  //         <div className="rf-grid-row rf-grid-row--gutters">
  //           <div className="rf-col">
  //             <Card
  //               horizontal
  //               title={
  //                 firstOccurenceDate ? dayjs(firstOccurenceDate).format('lll') : 'Searching...'
  //               }
  //               href={getTwitterLink(`#${hashtag?.name}`, { endDate: firstOccurenceDate })}
  //               description={'Date of first appearance'}
  //             />
  //           </div>
  //           <div className="rf-col">
  //             <Card
  //               horizontal
  //               title={!loading ? nbUsernames.toLocaleString('en') : '-'}
  //               description={'Nb Active users'}
  //               noArrow
  //             />
  //           </div>
  //           <div className="rf-col">
  //             <Card
  //               horizontal
  //               title={!loading ? nbAssociatedHashtags.toLocaleString('en') : '-'}
  //               description={'Nb Associated hashtags'}
  //               noArrow
  //             />
  //           </div>
  //           <div className="rf-col">
  //             <Card
  //               horizontal
  //               title={!loading ? totalNbTweets.toLocaleString('en') : '-'}
  //               description={'Total Tweets'}
  //               noArrow
  //             />
  //           </div>
  //           <div className="rf-col">
  //             <Card
  //               horizontal
  //               title={'TODO %'}
  //               description={'Inauthenticity Probability'}
  //               href={'#calculation-algorythm'}
  //             />
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </Layout>
  // );
};

export default TermPage;
