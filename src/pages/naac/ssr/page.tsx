import { useState, useEffect } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';
import { pageContentService, PageContent } from '../../../services/pageContentService';

// ── Types ──
interface Criterion {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  headBg: string;
}

interface MetricRow {
  no: string;
  type: 'QLM' | 'QNM';
  description: string;
  sub?: string[];
  weightage?: number;
  fileHints?: string[];
}

interface KeyIndicator {
  id: string;
  title: string;
  metrics: MetricRow[];
}

interface CriterionData {
  id: number;
  title: string;
  keyIndicators: KeyIndicator[];
}

// ─────────────────────────────────────────
// CRITERION DATA
// ─────────────────────────────────────────
const criteriaData: CriterionData[] = [
  {
    id: 1, title: 'Criterion 1 — Curricular Aspects',
    keyIndicators: [
      {
        id: '1.1', title: 'Key Indicator – 1.1  Curricular Planning and Implementation',
        metrics: [
          { no: '1.1.1', type: 'QLM', description: 'The Institution ensures effective curriculum planning and delivery through a well-planned and documented process including Academic calendar and conduct of continuous internal Assessment', sub: ['Write description in a maximum of 500 words'], fileHints: ['Upload Additional information', 'Provide Link for Additional information'] },
        ]
      },
      {
        id: '1.2', title: 'Key Indicator – 1.2  Academic Flexibility',
        metrics: [
          { no: '1.2.1', type: 'QNM', description: 'Number of Add on / Certificate / Value added programs offered during the last five years', sub: ['1.2.1.1: Number of Add on / Certificate / Value added programs offered during the last five years'] },
          { no: '1.2.2', type: 'QNM', description: 'Percentage of students enrolled in Certificate / Add-on / Value added programs as against the total number of students during the last five years', sub: ['1.2.2.1. Number of students enrolled in subject related Certificate / Add-on / Value added programs year wise during last five years.'] },
        ]
      },
      {
        id: '1.3', title: 'Key Indicator – 1.3  Curriculum Enrichment',
        metrics: [
          { no: '1.3.1', type: 'QLM', description: 'Institution integrates crosscutting issues relevant to Professional Ethics, Gender, Human Values, Environment and Sustainability into the Curriculum', sub: ['Write description in a maximum of 500 words'] },
          { no: '1.3.2', type: 'QNM', description: 'Percentage of students undertaking project work / field work / internships (Data for the latest completed academic year)', sub: ['1.3.2.1. Number of students undertaking Project work / field work / internships'] },
        ]
      },
      {
        id: '1.4', title: 'Key Indicator – 1.4  Feedback System',
        metrics: [
          { no: '1.4.1', type: 'QNM', description: 'Institution obtains feedback on the academic performance and ambience of the institution from various stakeholders, such as Students, Teachers, Employers, Alumni etc. and action taken report on the feedback is made available on institutional website (Yes or No)' },
        ]
      },
    ]
  },
  {
    id: 2, title: 'Criterion 2 — Teaching-Learning and Evaluation',
    keyIndicators: [
      {
        id: '2.1', title: 'Key Indicator – 2.1  Student Enrolment and Profile',
        metrics: [
          { no: '2.1.1', type: 'QNM', description: 'Enrollment Percentage' },
          { no: '2.1.2', type: 'QNM', description: 'Percentage of seats filled against reserved categories (SC, ST, OBC etc.) as per applicable reservation policy for the first year admission during the last five years', sub: ['2.1.2.1. Number of actual students admitted from the reserved categories year wise during last five years (Exclusive of supernumerary seats)'] },
        ]
      },
      {
        id: '2.2', title: 'Key Indicator – 2.2  Student Teacher Ratio',
        metrics: [
          { no: '2.2.1', type: 'QNM', description: 'Student – Full time Teacher Ratio (Data for the latest completed academic year)' },
        ]
      },
      {
        id: '2.3', title: 'Key Indicator – 2.3  Teaching-Learning Process',
        metrics: [
          { no: '2.3.1', type: 'QLM', description: 'Student centric methods, such as experiential learning, participative learning and problem solving methodologies are used for enhancing learning experiences and teachers use ICT-enabled tools including online resources for effective teaching and learning process', sub: ['Write description in a maximum of 500 words'] },
        ]
      },
      {
        id: '2.4', title: 'Key Indicator – 2.4  Teacher Profile and Quality',
        metrics: [
          { no: '2.4.1', type: 'QNM', description: 'Percentage of full-time teachers against sanctioned posts during the last five years', sub: ['2.4.1.1 Number of sanctioned posts year wise during the last five years'] },
          { no: '2.4.2', type: 'QNM', description: 'Percentage of full time teachers with NET/SET/SLET/ Ph.D./D.Sc./D.Litt./L.L.D. during the last five years (consider only highest degree for count)', sub: ['2.4.2.1. Number of full time teachers with NET/SET/SLET/Ph.D./D.Sc./D.Litt./L.L.D year wise during the last five years'] },
        ]
      },
      {
        id: '2.5', title: 'Key Indicator – 2.5  Evaluation Process and Reforms',
        metrics: [
          { no: '2.5.1', type: 'QLM', description: 'Mechanism of internal / external assessment is transparent and the grievance redressal system is time-bound and efficient', sub: ['Write description in a maximum of 500 words'] },
        ]
      },
      {
        id: '2.6', title: 'Key Indicator – 2.6  Student Performance and Learning Outcome',
        metrics: [
          { no: '2.6.1', type: 'QLM', description: 'Programme Outcomes (POs) and Course Outcomes (COs) for all Programmes offered by the institution are stated and displayed on website', sub: ['Write description in a maximum of 500 words'] },
          { no: '2.6.2', type: 'QLM', description: 'Attainment of POs and COs are evaluated. Explain with evidence in a maximum of 500 words' },
          { no: '2.6.3', type: 'QNM', description: 'Pass percentage of Students during last five years (Excluding Backlog Students)' },
        ]
      },
      {
        id: '2.7', title: 'Key Indicator – 2.7  Student Satisfaction Survey',
        metrics: [
          { no: '2.7.1', type: 'QNM', description: 'Online student satisfaction survey regarding to teaching learning process' },
        ]
      },
    ]
  },
  {
    id: 3, title: 'Criterion 3 — Research, Innovations and Extension',
    keyIndicators: [
      {
        id: '3.1', title: 'Key Indicator – 3.1  Resource Mobilization for Research',
        metrics: [
          { no: '3.1.1', type: 'QNM', description: 'Grants received from Government and non-governmental agencies for research projects / endowments in the institution during the last five years (INR in Lakhs)', sub: ['3.1.1.1: Total Grants from Government and non-governmental agencies for research projects / endowments during the last five years (INR in Lakhs)'] },
        ]
      },
      {
        id: '3.2', title: 'Key Indicator – 3.2  Innovation Ecosystem',
        metrics: [
          { no: '3.2.1', type: 'QLM', description: 'Institution has created an ecosystem for innovations, Indian Knowledge System (IKS), including awareness about IPR, establishment of IPR cell, Incubation centre and other initiatives for the creation and transfer of knowledge / technology', sub: ['Write description in a maximum of 500 words'] },
          { no: '3.2.2', type: 'QNM', description: 'Number of workshops / seminars / conferences including programs conducted on Research Methodology, IPR and entrepreneurship during the last five years', sub: ['3.2.2.1: Total number of workshops / seminars / conferences conducted on Research Methodology, IPR and entrepreneurship year wise during last five years'] },
        ]
      },
      {
        id: '3.3', title: 'Key Indicator – 3.3  Research Publication and Awards',
        metrics: [
          { no: '3.3.1', type: 'QNM', description: 'Number of research papers published per teacher in the Journals notified on UGC care list during the last five years', sub: ['3.3.1.1. Number of research papers in the Journals notified on UGC CARE year wise during the last five years'] },
          { no: '3.3.2', type: 'QNM', description: 'Number of books and chapters in edited volumes / books published and papers in national / international conference proceedings per teacher during last five years', sub: ['3.3.2.1. Total number of books, chapters and papers in national / international conference proceedings year wise during last five years'] },
        ]
      },
      {
        id: '3.4', title: 'Key Indicator – 3.4  Extension Activities',
        metrics: [
          { no: '3.4.1', type: 'QLM', description: 'Outcomes of Extension activities in the neighborhood community in terms of impact and sensitizing the students to social issues for their holistic development during the last five years', sub: ['Write description in a maximum of 500 words'] },
          { no: '3.4.2', type: 'QLM', description: 'Awards and recognitions received for extension activities from government / government recognized bodies', sub: ['Write description in a maximum of 500 words'] },
          { no: '3.4.3', type: 'QNM', description: 'Number of extension and outreach programs conducted by the institution through organized forums including NSS/NCC with involvement of community during the last five years', sub: ['3.4.3.1. Number of extension and outreach programs conducted through NSS/NCC with involvement of community during the last five years'] },
        ]
      },
      {
        id: '3.5', title: 'Key Indicator – 3.5  Collaboration',
        metrics: [
          { no: '3.5.1', type: 'QNM', description: 'Number of functional MoUs / linkages with institutions / industries in India and abroad for internship, on-the-job training, project work, student / faculty exchange and collaborative research during the last five years', sub: ['3.5.1.1 Number of functional MoUs / linkages with institutions / industries in India and abroad'] },
        ]
      },
    ]
  },
  {
    id: 4, title: 'Criterion 4 — Infrastructure and Learning Resources',
    keyIndicators: [
      {
        id: '4.1', title: 'Key Indicator – 4.1  Physical Facilities',
        metrics: [
          { no: '4.1.1', type: 'QLM', description: 'The Institution has adequate infrastructure and other facilities for teaching – learning, viz., classrooms, laboratories, computing equipment etc. ICT – enabled facilities such as smart class, LMS etc. Facilities for Cultural and sports activities, yoga centre, games (indoor and outdoor), Gymnasium, auditorium etc.', sub: ['Describe the adequacy of facilities in maximum of 500 words'] },
          { no: '4.1.2', type: 'QNM', description: 'Percentage of expenditure, excluding salary for infrastructure augmentation during last five years (INR in Lakhs)', sub: ['4.1.2.1 Expenditure for infrastructure augmentation, excluding salary year wise during last five years (INR in lakhs)'] },
        ]
      },
      {
        id: '4.2', title: 'Key Indicator – 4.2  Library as a Learning Resource',
        metrics: [
          { no: '4.2.1', type: 'QLM', description: 'Library is automated with digital facilities using Integrated Library Management System (ILMS), adequate subscriptions to e-resources and journals are made. The library is optimally used by the faculty and students', sub: ['Write description in a maximum of 500 words'] },
        ]
      },
      {
        id: '4.3', title: 'Key Indicator – 4.3  IT Infrastructure',
        metrics: [
          { no: '4.3.1', type: 'QLM', description: 'Institution frequently updates its IT facilities and provides sufficient bandwidth for internet connection', sub: ['Write description in a maximum of 500 words'] },
          { no: '4.3.2', type: 'QNM', description: 'Student – Computer ratio (Data for the latest completed academic year)', sub: ['4.3.2.1. Number of computers available for students usage during the latest completed academic year'] },
        ]
      },
      {
        id: '4.4', title: 'Key Indicator – 4.4  Maintenance of Campus Infrastructure',
        metrics: [
          { no: '4.4.1', type: 'QNM', description: 'Percentage expenditure incurred on maintenance of physical facilities and academic support facilities excluding salary component, during the last five years', sub: ['4.4.1.1 Expenditure incurred on maintenance of physical facilities and academic support facilities excluding salary component year wise during last five years (INR in lakhs)'] },
        ]
      },
    ]
  },
  {
    id: 5, title: 'Criterion 5 — Student Support and Progression',
    keyIndicators: [
      {
        id: '5.1', title: 'Key Indicator – 5.1  Student Support',
        metrics: [
          { no: '5.1.1', type: 'QNM', weightage: 20, description: 'Percentage of students benefited by scholarships and freeships provided by the Government and Non-Government agencies during last five years', sub: ['5.1.1.1. Number of students benefited by scholarships and freeships provided by the Government and Non-Government agencies year wise during last five years'] },
          { no: '5.1.2', type: 'QNM', weightage: 10, description: 'Capacity building and skills enhancement initiatives taken by the institution include the following: 1. Soft skills  2. Language and communication skills  3. Life skills (Yoga, physical fitness, health and hygiene)  4. Awareness of trends in technology' },
          { no: '5.1.3', type: 'QNM', weightage: 10, description: 'Percentage of students benefitted by guidance for competitive examinations and career counselling offered by the Institution during the last five years', sub: ['5.1.3.1. Number of students benefitted by guidance for competitive examinations and career counselling year wise during last five years'] },
          { no: '5.1.4', type: 'QNM', weightage: 10, description: 'The Institution has a transparent mechanism for timely redressal of student grievances including sexual harassment and ragging cases', sub: ['1. Implementation of guidelines of statutory / regulatory bodies', '2. Organization wide awareness and undertakings on policies with zero tolerance', '3. Mechanisms for submission of online / offline students\' grievances', '4. Timely redressal of the grievances through appropriate committees'] },
        ]
      },
      {
        id: '5.2', title: 'Key Indicator – 5.2  Student Progression',
        metrics: [
          { no: '5.2.1', type: 'QNM', weightage: 20, description: 'Percentage of placement of outgoing students and students progressing to higher education during the last five years', sub: ['5.2.1.1. Number of outgoing students placed and progressed to higher education during the last five years'] },
          { no: '5.2.2', type: 'QNM', weightage: 10, description: 'Percentage of students qualifying in state / national / international level examinations during the last five years (eg: JAM / CLAT / GATE / GMAT / CAT / GRE / TOEFL / Civil Services / State government examinations)', sub: ['5.2.2.1. Number of students qualifying in state / national / international level examinations year wise during last five years'] },
        ]
      },
      {
        id: '5.3', title: 'Key Indicator – 5.3  Student Participation and Activities',
        metrics: [
          { no: '5.3.1', type: 'QNM', weightage: 25, description: 'Number of awards / medals for outstanding performance in sports / cultural activities at University / state / national / international level during the last five years', sub: ['5.3.1.1: Number of awards / medals for outstanding performance (award for a team event should be counted as one) year wise during the last five years'] },
          { no: '5.3.2', type: 'QNM', weightage: 25, description: 'Average number of sports and cultural programs in which students of the Institution participated during last five years (organized by the institution / other institutions)', sub: ['5.3.2.1. Number of sports and cultural programs in which students participated year wise during last five years'] },
        ]
      },
      {
        id: '5.4', title: 'Key Indicator – 5.4  Alumni Engagement',
        metrics: [
          { no: '5.4.1', type: 'QLM', weightage: 10, description: 'There is a registered Alumni Association that contributes significantly to the development of the institution through financial and / or other support services', sub: ['Write description in a maximum of 500 words'] },
        ]
      },
    ]
  },
  {
    id: 6, title: 'Criterion 6 — Governance, Leadership and Management',
    keyIndicators: [
      {
        id: '6.1', title: 'Key Indicator – 6.1  Institutional Vision and Leadership',
        metrics: [
          { no: '6.1.1', type: 'QLM', weightage: 10, description: 'The institutional governance and leadership are in accordance with the vision and mission of the Institution and it is visible in various institutional practices such as NEP implementation, sustained institutional growth, decentralization, participation in the institutional governance and in their short term and long term Institutional Perspective Plan.' },
        ]
      },
      {
        id: '6.2', title: 'Key Indicator – 6.2  Strategy Development and Deployment',
        metrics: [
          { no: '6.2.1', type: 'QLM', weightage: 6, description: 'The institutional perspective plan is effectively deployed and functioning of the institutional bodies is effective and efficient as visible from policies, administrative setup, appointment, service rules, and procedures, etc.', sub: ['Write description in a maximum of 500 words'] },
          { no: '6.2.2', type: 'QNM', weightage: 4, description: 'Institution implements e-governance in its operations', sub: ['1. Administration including complaint management', '2. Finance and Accounts', '3. Student Admission and Support', '4. Examinations'] },
        ]
      },
      {
        id: '6.3', title: 'Key Indicator – 6.3  Faculty Empowerment Strategies',
        metrics: [
          { no: '6.3.1', type: 'QLM', weightage: 8, description: 'The institution has performance appraisal system, effective welfare measures for teaching and non-teaching staff and avenues for career development / progression', sub: ['Write description in a maximum of 500 words'] },
          { no: '6.3.2', type: 'QNM', weightage: 12, description: 'Percentage of teachers provided with financial support to attend conferences / workshops and towards membership fee of professional bodies during the last five years', sub: ['6.3.2.1. Number of teachers provided with financial support to attend conferences / workshops and towards membership fee of professional bodies year wise during the last five years'] },
          { no: '6.3.3', type: 'QNM', weightage: 15, description: 'Percentage of teaching and non-teaching staff participating in Faculty development Programmes (FDP), professional development / administrative training programs during the last five years', sub: ['6.3.3.1. Total number of teaching and non-teaching staff participating in FDP / MDP / professional development / administrative training programs during the last five years', '6.3.3.2 Number of non-teaching staff year wise during the last five years'] },
        ]
      },
      {
        id: '6.4', title: 'Key Indicator – 6.4  Financial Management and Resource Mobilization',
        metrics: [
          { no: '6.4.1', type: 'QLM', weightage: 15, description: 'Institution has strategies for mobilization and optimal utilization of resources and funds from various sources (government / non-government organizations) and it conducts financial audits regularly (internal and external)', sub: ['Write description in a maximum of 500 words'] },
        ]
      },
      {
        id: '6.5', title: 'Key Indicator – 6.5  Internal Quality Assurance System',
        metrics: [
          { no: '6.5.1', type: 'QLM', weightage: 15, description: 'Internal Quality Assurance Cell (IQAC) has contributed significantly for institutionalizing the quality assurance strategies and processes. It reviews teaching learning process, structures & methodologies of operations and learning outcomes at periodic intervals and records the incremental improvement in various activities', sub: ['Write description in a maximum of 500 words'] },
          { no: '6.5.2', type: 'QNM', weightage: 15, description: 'Quality assurance initiatives of the institution include:', sub: ['1. Regular meeting of IQAC; quality improvement initiatives identified and implemented', '2. Academic and Administrative Audit (AAA) and follow-up action taken', '3. Collaborative quality initiatives with other institution(s)', '4. Participation in NIRF and other recognized rankings', '5. Any other quality audit / accreditation recognized by state, national or international agencies such as NAAC, NBA etc.'] },
        ]
      },
    ]
  },
  {
    id: 7, title: 'Criterion 7 — Institutional Values and Best Practices',
    keyIndicators: [
      {
        id: '7.1', title: 'Key Indicator – 7.1  Institutional Values and Social Responsibilities',
        metrics: [
          { no: '7.1.1', type: 'QLM', weightage: 10, description: 'Institution has initiated the Gender Audit and measures for the promotion of gender equity during the last five years. Describe the gender equity & sensitization in curricular and co-curricular activities, facilities for women on campus etc.', sub: ['Write description within 500 words'] },
          { no: '7.1.2', type: 'QNM', weightage: 20, description: 'The Institution has facilities and initiatives for:', sub: ['1. Alternate sources of energy and energy conservation measures', '2. Management of the various types of degradable and non-degradable waste', '3. Water conservation', '4. Green campus initiatives', '5. Disabled-friendly, barrier free environment'] },
          { no: '7.1.3', type: 'QNM', weightage: 10, description: 'Quality audits on environment and energy regularly undertaken by the Institution:', sub: ['1. Green audit / Environment audit', '2. Energy audit', '3. Clean and green campus initiatives', '4. Beyond the campus environmental promotion activities'] },
          { no: '7.1.4', type: 'QLM', weightage: 10, description: 'Describe the Institutional efforts / initiatives in providing an inclusive environment i.e., tolerance and harmony towards cultural, regional, linguistic, communal, socioeconomic and sensitization of students and employees to the constitutional obligations: values, rights, duties and responsibilities of citizens', sub: ['Write description in a maximum of 500 words'] },
        ]
      },
      {
        id: '7.2', title: 'Key Indicator – 7.2  Best Practices',
        metrics: [
          { no: '7.2.1', type: 'QLM', weightage: 10, description: 'Describe two best practices successfully implemented by the Institution as per NAAC format provided in the Manual', sub: ['Write description in a maximum of 500 words'] },
        ]
      },
      {
        id: '7.3', title: 'Key Indicator – 7.3  Institutional Distinctiveness',
        metrics: [
          { no: '7.3.1', type: 'QLM', weightage: 15, description: 'Portray the performance of the Institution in one area distinctive to its priority and thrust in not more than 200 words', sub: ['Write description in a maximum of 200 words'] },
        ]
      },
    ]
  },
];

// ─────────────────────────────────────────
// CRITERION CONFIG (colors per criterion)
// ─────────────────────────────────────────
const criterionConfig = [
  { id:1, title:'Curricular Aspects',                    description:'Curriculum design, implementation, and academic flexibility',            icon:'ri-book-open-line',    color:'text-blue-600',   bgColor:'bg-blue-50 border-blue-200',    gradientFrom:'#1d4ed8', gradientTo:'#60a5fa', kiHeadBg:'#eff6ff', kiHeadBorder:'#3b82f6', kiHeadText:'#1d4ed8', tableBg:'#1d4ed8', btnBg:'#3b82f6', accentText:'#3b82f6' },
  { id:2, title:'Teaching-Learning and Evaluation',       description:'Student enrollment, teaching-learning process, and evaluation',          icon:'ri-presentation-line', color:'text-green-600',  bgColor:'bg-green-50 border-green-200',  gradientFrom:'#065f46', gradientTo:'#34d399', kiHeadBg:'#ecfdf5', kiHeadBorder:'#10b981', kiHeadText:'#065f46', tableBg:'#065f46', btnBg:'#10b981', accentText:'#10b981' },
  { id:3, title:'Research, Innovations and Extension',    description:'Research promotion, resource mobilization, and extension activities',    icon:'ri-flask-line',        color:'text-purple-600', bgColor:'bg-purple-50 border-purple-200',gradientFrom:'#4c1d95', gradientTo:'#a78bfa', kiHeadBg:'#f5f3ff', kiHeadBorder:'#7c3aed', kiHeadText:'#4c1d95', tableBg:'#4c1d95', btnBg:'#7c3aed', accentText:'#7c3aed' },
  { id:4, title:'Infrastructure and Learning Resources',  description:'Physical facilities, library, IT infrastructure, and maintenance',       icon:'ri-building-line',     color:'text-orange-600', bgColor:'bg-orange-50 border-orange-200',gradientFrom:'#78350f', gradientTo:'#fbbf24', kiHeadBg:'#fffbeb', kiHeadBorder:'#d97706', kiHeadText:'#78350f', tableBg:'#78350f', btnBg:'#d97706', accentText:'#d97706' },
  { id:5, title:'Student Support and Progression',        description:'Student support services, progression, and alumni engagement',           icon:'ri-user-star-line',    color:'text-pink-600',   bgColor:'bg-pink-50 border-pink-200',    gradientFrom:'#831843', gradientTo:'#f9a8d4', kiHeadBg:'#fdf2f8', kiHeadBorder:'#ec4899', kiHeadText:'#831843', tableBg:'#831843', btnBg:'#ec4899', accentText:'#ec4899' },
  { id:6, title:'Governance, Leadership and Management',  description:'Institutional vision, leadership, governance, and financial management', icon:'ri-shield-star-line',  color:'text-indigo-600', bgColor:'bg-indigo-50 border-indigo-200',gradientFrom:'#312e81', gradientTo:'#a5b4fc', kiHeadBg:'#eef2ff', kiHeadBorder:'#6366f1', kiHeadText:'#312e81', tableBg:'#312e81', btnBg:'#6366f1', accentText:'#6366f1' },
  { id:7, title:'Institutional Values and Best Practices',description:'Gender equity, environmental consciousness, and best practices',         icon:'ri-leaf-line',         color:'text-teal-600',   bgColor:'bg-teal-50 border-teal-200',    gradientFrom:'#134e4a', gradientTo:'#5eead4', kiHeadBg:'#f0fdfa', kiHeadBorder:'#14b8a6', kiHeadText:'#134e4a', tableBg:'#134e4a', btnBg:'#14b8a6', accentText:'#14b8a6' },
];

// ─────────────────────────────────────────
// CRITERIA PANEL COMPONENT
// ─────────────────────────────────────────
const CriteriaPanel = ({ criterionId, onClose }: { criterionId: number; onClose: () => void }) => {
  const cfg = criterionConfig.find(c => c.id === criterionId)!;
  const data = criteriaData.find(c => c.id === criterionId)!;
  const hasWeightage = data.keyIndicators.some(ki => ki.metrics.some(m => m.weightage !== undefined));

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch"
      style={{ background: 'rgba(10,15,40,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="flex flex-col bg-white h-full w-full overflow-y-auto shadow-2xl"
        style={{ animation: 'slideInPanel .3s cubic-bezier(.22,.68,0,1.2)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-5 flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${cfg.gradientFrom} 0%, ${cfg.gradientTo} 100%)` }}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,.18)' }}>
              <i className={`${cfg.icon} text-2xl text-white`}></i>
            </div>
            <div>
              <div className="text-white font-bold text-base">{data.title}</div>
              <div className="text-white/70 text-xs mt-0.5">Academic Year 2023-24 · Computer Science Engineering</div>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm transition-all"
            style={{ background: 'rgba(255,255,255,.18)' }}
            onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,.32)')}
            onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,.18)')}>
            ✕
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 px-6 py-2 bg-gray-50 border-b border-gray-200 text-xs text-gray-500 flex-shrink-0">
          <span>Home</span><span className="text-gray-300">›</span>
          <span>NAAC</span><span className="text-gray-300">›</span>
          <span className="font-semibold" style={{ color: cfg.accentText }}>{data.title}</span>
        </div>

        {/* Body */}
        <div className="flex-1 px-6 py-5 space-y-5 max-w-7xl mx-auto w-full">
          {data.keyIndicators.map(ki => (
            <div key={ki.id}>
              {/* KI heading */}
              <div className="text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-r-lg mb-3"
                style={{ background: cfg.kiHeadBg, borderLeft: `3px solid ${cfg.kiHeadBorder}`, color: cfg.kiHeadText }}>
                {ki.title}
              </div>

              {/* Metrics table */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr style={{ background: cfg.tableBg }}>
                      <th className="text-left px-3 py-2 text-white text-xs font-bold uppercase tracking-wider w-28">Metric No.</th>
                      <th className="text-left px-3 py-2 text-white text-xs font-bold uppercase tracking-wider">Description</th>
                      {hasWeightage && <th className="text-center px-3 py-2 text-white text-xs font-bold uppercase tracking-wider w-20">Weightage</th>}
                      <th className="text-center px-3 py-2 text-white text-xs font-bold uppercase tracking-wider w-16">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ki.metrics.map((m, i) => (
                      <tr key={i} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                        {/* Metric number + badge */}
                        <td className="px-3 py-2.5 align-middle">
                          <span className="font-bold text-gray-900 text-xs whitespace-nowrap">{m.no}</span>
                          <span className={`ml-1.5 inline-block text-xs font-extrabold px-1.5 py-0.5 rounded align-middle ${m.type === 'QLM' ? 'bg-violet-100 text-violet-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            {m.type}
                          </span>
                        </td>

                        {/* Description */}
                        <td className="px-3 py-2.5 align-top text-gray-700 text-xs leading-relaxed">
                          {m.description}
                          {m.sub && m.sub.map((s, si) => (
                            <span key={si} className="block mt-1 text-gray-500 italic">{s}</span>
                          ))}
                          {m.fileHints && (
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {m.fileHints.map((h, hi) => (
                                <span key={hi} className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border"
                                  style={{ background: cfg.kiHeadBg, color: cfg.accentText, borderColor: cfg.kiHeadBorder }}>
                                  📎 {h}
                                </span>
                              ))}
                            </div>
                          )}
                        </td>

                        {/* Weightage */}
                        {hasWeightage && (
                          <td className="px-3 py-2.5 text-center align-middle font-bold text-xs" style={{ color: cfg.kiHeadText }}>
                            {m.weightage ?? '—'}
                          </td>
                        )}

                        {/* View link */}
                        <td className="px-3 py-2.5 text-center align-middle">
                          <a href="#" className="inline-flex items-center gap-1 text-white text-xs font-bold px-3 py-1.5 rounded-md transition-opacity hover:opacity-80"
                            style={{ background: cfg.btnBg }}>
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-center text-xs text-gray-400 flex-shrink-0">
          DMI Engineering College · © Copyright. All Rights Reserved. · By Matt Engineering Solutions
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────
const SSRPage = () => {
  const [selectedCycle, setSelectedCycle] = useState<string>('all');
  const [pageContents, setPageContents] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [openPanel, setOpenPanel] = useState<number | null>(null);

  useEffect(() => {
    pageContentService.getByPageSlug('naac-ssr')
      .then(data => { setPageContents(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Close panel on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenPanel(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Lock body scroll when panel open
  useEffect(() => {
    document.body.style.overflow = openPanel ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [openPanel]);

  const cycles = ['all', 'Cycle 2', 'Cycle 1'];
  const filteredContents = selectedCycle === 'all'
    ? pageContents
    : pageContents.filter(c => c.section_title?.includes(selectedCycle));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar scrolled={true} />

      {/* Panel slide-in animation */}
      <style>{`
        @keyframes slideInPanel {
          from { transform: translateY(40px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>

      <main className="flex-grow pt-20">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <a href="/" className="hover:text-indigo-600 transition-colors">Home</a>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
              <span className="text-gray-900 font-medium">NAAC</span>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
              <span className="text-gray-900 font-medium">SSR</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <i className="ri-file-text-line text-5xl"></i>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Self Study Report (SSR)</h1>
            <p className="text-xl text-center text-indigo-100 max-w-3xl mx-auto">
              Comprehensive institutional self-assessment across seven NAAC criteria
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* About SSR */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-12">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="ri-information-line text-2xl text-indigo-600"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">About Self Study Report</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The Self Study Report (SSR) is a comprehensive document that presents the institution's self-assessment
                  based on the seven criteria defined by NAAC. It reflects the institution's journey towards quality
                  enhancement and demonstrates compliance with national standards of excellence.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  DMI Engineering College's SSR showcases our commitment to academic excellence, research innovation,
                  infrastructure development, student support, and institutional governance. The report is prepared through
                  extensive data collection, stakeholder consultation, and rigorous self-evaluation process.
                </p>
              </div>
            </div>
          </div>

          {/* Seven Criteria Cards */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Seven Criteria of NAAC Assessment</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {criterionConfig.map((cfg) => (
                <div
                  key={cfg.id}
                  className={`${cfg.bgColor} border rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 select-none`}
                  style={{ borderLeftWidth: 4 }}
                  onClick={() => setOpenPanel(cfg.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${cfg.color} bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <i className={`${cfg.icon} text-2xl`}></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`text-xs font-bold ${cfg.color} uppercase tracking-wide`}>Criterion {cfg.id}</span>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 mb-1 leading-snug">{cfg.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{cfg.description}</p>
                      <div className={`flex items-center gap-1 mt-3 text-xs font-semibold ${cfg.color} opacity-70`}>
                        View Details
                        <i className="ri-arrow-right-line text-sm"></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filter */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-gray-900">SSR Documents</h2>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 font-medium">Filter by Cycle:</span>
                <div className="flex space-x-2">
                  {cycles.map((cycle) => (
                    <button key={cycle} onClick={() => setSelectedCycle(cycle)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                        selectedCycle === cycle
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}>
                      {cycle === 'all' ? 'All Cycles' : cycle}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="space-y-4 mb-16">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
              </div>
            ) : filteredContents.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <i className="ri-file-text-line text-5xl text-gray-300 mb-4 block"></i>
                <p className="text-gray-500">No documents added yet.</p>
                <p className="text-sm text-gray-400 mt-1">Add content from Admin → Page Content → NAAC - SSR</p>
              </div>
            ) : (
              filteredContents.map((content) => (
                <div key={content.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 p-6 group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="ri-file-text-line text-2xl text-indigo-600"></i>
                    </div>
                    <div className="flex-1">
                      {content.section_title && (
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                          {content.section_title}
                        </h3>
                      )}
                      {content.body_text && (
                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">{content.body_text}</p>
                      )}
                      {content.image_urls && content.image_urls.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                          {content.image_urls.map((url, i) => (
                            <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                              <img src={url} alt={`Image ${i + 1}`}
                                className="w-full h-24 object-cover rounded-lg border border-gray-200 hover:opacity-90 transition-opacity" />
                            </a>
                          ))}
                        </div>
                      )}
                      {content.pdf_urls && content.pdf_urls.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {content.pdf_urls.map((url, i) => (
                            <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                              <i className="ri-file-pdf-line"></i> PDF {i + 1} <i className="ri-download-line"></i>
                            </a>
                          ))}
                        </div>
                      )}
                      {content.doc_urls && content.doc_urls.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {content.doc_urls.map((url, i) => (
                            <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                              <i className="ri-file-word-line"></i> DOC {i + 1} <i className="ri-download-line"></i>
                            </a>
                          ))}
                        </div>
                      )}
                      {content.video_url && (
                        <a href={content.video_url} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 text-purple-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors">
                          <i className="ri-video-line"></i> Watch Video <i className="ri-external-link-line"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Statistics */}
          <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">SSR Preparation Statistics</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: 'ri-team-line',        value: '50+',  label: 'Contributors' },
                { icon: 'ri-file-list-3-line', value: '1000+',label: 'Pages'        },
                { icon: 'ri-folder-line',       value: '5000+',label: 'Documents'   },
                { icon: 'ri-time-line',         value: '6',    label: 'Months'      },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <i className={`${s.icon} text-3xl`}></i>
                  </div>
                  <div className="text-3xl font-bold mb-1">{s.value}</div>
                  <div className="text-sm text-indigo-100">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />

      {/* Criterion Panel Overlay */}
      {openPanel && <CriteriaPanel criterionId={openPanel} onClose={() => setOpenPanel(null)} />}
    </div>
  );
};

export default SSRPage;