import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

const HomePage = lazy(() => import('../pages/home/page'));
const ClubDetailPage = lazy(() => import('../pages/co-curricular/clubs/[slug]/page'));
const NotFound = lazy(() => import('../pages/NotFound'));
const ApplicationPage = lazy(() => import('../pages/application/page'));
const EventsPage = lazy(() => import('../pages/events/page'));
const EventGalleryPage = lazy(() => import('../pages/events/gallery/page'));
const ResearchPage = lazy(() => import('../pages/research/page'));
const CSEPage = lazy(() => import('../pages/departments/cse/page'));
const ECEPage = lazy(() => import('../pages/departments/ece/page'));
const EEEPage = lazy(() => import('../pages/departments/eee/page'));
const MechanicalPage = lazy(() => import('../pages/departments/mechanical/page'));
const ITPage = lazy(() => import('../pages/departments/it/page'));
const AIDSPage = lazy(() => import('../pages/departments/aids/page'));
const ScienceHumanitiesPage = lazy(() => import('../pages/courses/science-humanities/page'));
const AdminLoginPage = lazy(() => import('../pages/admin/login/page'));
const AdminDashboardPage = lazy(() => import('../pages/admin/page'));
const AdminEventsPage = lazy(() => import('../pages/admin/events/page'));
const AdminFacultyPage = lazy(() => import('../pages/admin/faculty/page'));
const AdminFacilitiesPage = lazy(() => import('../pages/admin/facilities/page'));
const AdminNewsPage = lazy(() => import('../pages/admin/news/page'));
const AdminAnnouncementsPage = lazy(() => import('../pages/admin/announcements/page'));
const AdminLaboratoriesPage = lazy(() => import('../pages/admin/laboratories/page'));
const AdminClubsPage = lazy(() => import('../pages/admin/clubs/page'));
const AdminPlacementRecordsPage = lazy(() => import('../pages/admin/placement-records/page'));
const AdminPlacementTeamPage = lazy(() => import('../pages/admin/placement-team/page'));
const AdminRecruitersPage = lazy(() => import('../pages/admin/recruiters/page'));
const AdminGalleryPage = lazy(() => import('../pages/admin/gallery/page'));
const AdminAlumniPage = lazy(() => import('../pages/admin/alumni/page'));
const AdminContactPage = lazy(() => import('../pages/admin/contact/page'));
const AdminSportsPage = lazy(() => import('../pages/admin/sports/page'));
const AdminNewsEventsPage = lazy(() => import('../pages/admin/news-events/page'));
const AdminPageContentPage = lazy(() => import('../pages/admin/page-content/page'));

const ResetPasswordPage = lazy(() => import('../pages/admin/reset-password/page'));
const InfrastructurePage = lazy(() => import('../pages/facilities/infrastructure/page'));
const LibraryPage = lazy(() => import('../pages/facilities/library/page'));
const HostelPage = lazy(() => import('../pages/facilities/hostel/page'));
const TransportationPage = lazy(() => import('../pages/facilities/transportation/page'));
const CanteenPage = lazy(() => import('../pages/facilities/canteen/page'));
const GymPage = lazy(() => import('../pages/facilities/gym/page'));
const ICTAcademyPage = lazy(() => import('../pages/facilities/ict-academy/page'));
const LaboratoriesPage = lazy(() => import('../pages/facilities/laboratories/page'));
const SportsPage = lazy(() => import('../pages/facilities/sports/page'));
const ICTMembershipPage = lazy(() => import('../pages/co-curricular/membership/ict/page'));
const ISTEMembershipPage = lazy(() => import('../pages/co-curricular/membership/iste/page'));
const CSIMembershipPage = lazy(() => import('../pages/co-curricular/membership/csi/page'));
const ClubsPage = lazy(() => import('../pages/co-curricular/clubs/page'));
const PlacementCellPage = lazy(() => import('../pages/placement/cell/page'));
const PlacementTeamsPage = lazy(() => import('../pages/placement/teams/page'));
const PlacementRecordsPage = lazy(() => import('../pages/placement/records/page'));
const EDCPage = lazy(() => import('../pages/placement/edc/page'));
const RecruitersPage = lazy(() => import('../pages/placement/recruiters/page'));
const PrivacyPolicyPage = lazy(() => import('../pages/privacy-policy/page'));
const AntiRaggingPage = lazy(() => import('../pages/committees/anti-ragging/page'));
const GrievancePage = lazy(() => import('../pages/committees/grievance/page'));
const ICCPage = lazy(() => import('../pages/committees/icc/page'));
const IQACPage = lazy(() => import('../pages/committees/iqac/page'));
const IIQAPage = lazy(() => import('../pages/naac/iiqa/page'));
const SSRPage = lazy(() => import('../pages/naac/ssr/page'));
const RITPage = lazy(() => import('../pages/naac/rit/page'));
const SelfDeclarationPage = lazy(() => import('../pages/naac/self-declaration/page'));
const AQARPage = lazy(() => import('../pages/naac/aqar/page'));
const CriteriaDocumentsPage = lazy(() => import('../pages/naac/criteria-documents/page'));
const OverviewPage = lazy(() => import('../pages/about/overview/page'));
const AdministrationPage = lazy(() => import('../pages/about/administration/page'));
const GoverningCouncilPage = lazy(() => import('../pages/about/governing-council/page'));
const RecruitmentPolicyPage = lazy(() => import('../pages/about/recruitment-policy/page'));
const ServiceRulesPage = lazy(() => import('../pages/about/service-rules/page'));
const StartupPage = lazy(() => import('../pages/innovation/startup/page'));
const IncubationPage = lazy(() => import('../pages/innovation/incubation/page'));
const IICPage = lazy(() => import('../pages/innovation/iic/page'));
const RdResonancePage = lazy(() => import('../pages/research/rd-resonance/page'));
const PublicationsPage = lazy(() => import('../pages/research/publications/page'));
const ResearchPolicyPage = lazy(() => import('../pages/research/policy/page'));
const FundedProjectsPage = lazy(() => import('../pages/research/funded-projects/page'));
const CoePage = lazy(() => import('../pages/research/coe/page'));
const RdProjectsPage = lazy(() => import('../pages/research/rd-projects/page'));
const IprPatentsPage = lazy(() => import('../pages/research/ipr-patents/page'));
const GalleryImagesPage = lazy(() => import('../pages/gallery/images/page'));
const GalleryVideosPage = lazy(() => import('../pages/gallery/videos/page'));
const AlumniRegistrationPage = lazy(() => import('../pages/alumni/registration/page'));
const AlumniMeetPage = lazy(() => import('../pages/alumni/meet/page'));
const DistinguishedAlumniPage = lazy(() => import('../pages/alumni/distinguished/page'));
const ContactPage = lazy(() => import('../pages/contact/page'));

const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/application', element: <ApplicationPage /> },
  { path: '/events', element: <EventsPage /> },
  { path: '/events/:folderId', element: <EventGalleryPage /> },
  { path: '/research', element: <ResearchPage /> },
  { path: '/research/rd-resonance', element: <RdResonancePage /> },
  { path: '/research/publications', element: <PublicationsPage /> },
  { path: '/research/policy', element: <ResearchPolicyPage /> },
  { path: '/research/funded-projects', element: <FundedProjectsPage /> },
  { path: '/research/coe', element: <CoePage /> },
  { path: '/research/rd-projects', element: <RdProjectsPage /> },
  { path: '/research/ipr-patents', element: <IprPatentsPage /> },
  { path: '/departments/cse', element: <CSEPage /> },
  { path: '/departments/ece', element: <ECEPage /> },
  { path: '/departments/eee', element: <EEEPage /> },
  { path: '/departments/mechanical', element: <MechanicalPage /> },
  { path: '/departments/it', element: <ITPage /> },
  { path: '/departments/aids', element: <AIDSPage /> },
  { path: '/courses/science-humanities', element: <ScienceHumanitiesPage /> },
  { path: '/facilities/infrastructure', element: <InfrastructurePage /> },
  { path: '/facilities/library', element: <LibraryPage /> },
  { path: '/facilities/hostel', element: <HostelPage /> },
  { path: '/facilities/transportation', element: <TransportationPage /> },
  { path: '/facilities/canteen', element: <CanteenPage /> },
  { path: '/facilities/gym', element: <GymPage /> },
  { path: '/facilities/ict-academy', element: <ICTAcademyPage /> },
  { path: '/facilities/laboratories', element: <LaboratoriesPage /> },
  { path: '/facilities/sports', element: <SportsPage /> },
  { path: '/co-curricular/membership/ict', element: <ICTMembershipPage /> },
  { path: '/co-curricular/membership/iste', element: <ISTEMembershipPage /> },
  { path: '/co-curricular/membership/csi', element: <CSIMembershipPage /> },
  { path: '/co-curricular/clubs/:slug', element: <ClubDetailPage /> },
{ path: '/co-curricular/clubs', element: <ClubsPage /> },
  { path: '/placement/cell', element: <PlacementCellPage /> },
  { path: '/placement/teams', element: <PlacementTeamsPage /> },
  { path: '/placement/records', element: <PlacementRecordsPage /> },
  { path: '/placement/edc', element: <EDCPage /> },
  { path: '/placement/recruiters', element: <RecruitersPage /> },
  { path: '/gallery/images', element: <GalleryImagesPage /> },
  { path: '/gallery/videos', element: <GalleryVideosPage /> },
  { path: '/alumni/registration', element: <AlumniRegistrationPage /> },
  { path: '/alumni/meet', element: <AlumniMeetPage /> },
  { path: '/alumni/distinguished', element: <DistinguishedAlumniPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/admin/login', element: <AdminLoginPage /> },
  { path: '/admin/reset-password', element: <ResetPasswordPage /> },

  {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <AdminDashboardPage />,
      },
      {path: 'page-content',
  element: <AdminPageContentPage />,
},
      {
        path: 'events',
        element: <AdminEventsPage />,
      },
      {
        path: 'faculty',
        element: <AdminFacultyPage />,
      },
      {
        path: 'facilities',
        element: <AdminFacilitiesPage />,
      },
      {
        path: 'news',
        element: <AdminNewsPage />,
      },
       {
        path: 'news-events',
        element: <AdminNewsEventsPage />,
      },
      {
        path: 'announcements',
        element: <AdminAnnouncementsPage />,
      },
      {
        path: 'laboratories',
        element: <AdminLaboratoriesPage />,
      },
      {
        path: 'clubs',
        element: <AdminClubsPage />,
      },
      {
        path: 'placement-records',
        element: <AdminPlacementRecordsPage />,
      },
      {
        path: 'placement-team',
        element: <AdminPlacementTeamPage />,
      },
      {
        path: 'recruiters',
        element: <AdminRecruitersPage />,
      },
      {
        path: 'gallery',
        element: <AdminGalleryPage />,
      },
      {
        path: 'alumni',
        element: <AdminAlumniPage />,
      },
      {
        path: 'contact',
        element: <AdminContactPage />,
      },
      
  
      {
        path: 'sports',
        element: <AdminSportsPage />,
      },
    ],
  },
  { path: '/committees/anti-ragging', element: <AntiRaggingPage /> },
  { path: '/committees/grievance', element: <GrievancePage /> },
  { path: '/committees/icc', element: <ICCPage /> },
  { path: '/committees/iqac', element: <IQACPage /> },
  { path: '/privacy-policy', element: <PrivacyPolicyPage /> },
  { path: '/naac/iiqa', element: <IIQAPage /> },
  { path: '/naac/ssr', element: <SSRPage /> },
  { path: '/naac/rit', element: <RITPage /> },
  { path: '/naac/self-declaration', element: <SelfDeclarationPage /> },
  { path: '/naac/aqar', element: <AQARPage /> },
  { path: '/naac/criteria-documents', element: <CriteriaDocumentsPage /> },
  { path: '/about/overview', element: <OverviewPage /> },
  { path: '/about/administration', element: <AdministrationPage /> },
  { path: '/about/governing-council', element: <GoverningCouncilPage /> },
  { path: '/about/recruitment-policy', element: <RecruitmentPolicyPage /> },
  { path: '/about/service-rules', element: <ServiceRulesPage /> },
  { path: '/innovation/startup', element: <StartupPage /> },
  { path: '/innovation/incubation', element: <IncubationPage /> },
  { path: '/innovation/iic', element: <IICPage /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
