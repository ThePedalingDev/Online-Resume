import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Award, GraduationCap, ExternalLink, CheckCircle2, Archive } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerReveal } from '@/components/animations/StaggerReveal';
import SplitText from '@/components/animations/SplitText';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';

export function Docs() {
  const certifications = [
    {
      title: 'BSc Computer and Information Science (Cum Laude*)',
      issuer: 'Varsity College – Pretoria Campus, RSA',
      date: '2023 to December 2025',
      type: 'Degree',
      description: 'Bachelor of Science degree in Computer and Information Sciences. Expected to be received Cum Laude, passing 19 of 20 completed modules with distinctions.',
      status: 'In Progress',
      icon: GraduationCap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-600/10',
      downloadUrl: '#',
      verifyUrl: null,
    },
    {
      title: 'Golden Key International Honour Society',
      issuer: 'Golden Key International',
      date: '2024',
      type: 'Honour Society',
      description: 'Prestigious academic honour society recognizing top 15% of students for outstanding scholastic achievement and excellence.',
      status: 'Verified',
      icon: Award,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-600/10',
      downloadUrl: '/cert-docs/VC_GoldenKey.pdf',
      verifyUrl: 'https://golden-key-international-honou.verified.cv/en/verify/20892159851455',
    },
    {
      title: 'Full-Stack Web Development',
      issuer: 'Certification Authority',
      date: '2023',
      type: 'Certificate',
      description: 'Comprehensive certification covering React, Node.js, databases, and deployment strategies.',
      status: 'Verified',
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-600/10',
      downloadUrl: '#',
      verifyUrl: null,
    },
    {
      title: 'ASP.NET Core Developer',
      issuer: 'Microsoft',
      date: '2023',
      type: 'Certificate',
      description: 'Professional certification in ASP.NET Core MVC, Entity Framework, and C# development.',
      status: 'Verified',
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-600/10',
      downloadUrl: '#',
      verifyUrl: null,
    },
  ];

  const academicRecords = [
    {
      title: 'Academic Transcript',
      description: 'Complete academic record including all courses, grades, and GPA.',
      type: 'Transcript',
      icon: FileText,
      downloadUrl: '/cert-docs/VarsityCollege_Results.zip',
      isZip: true,
    },
    {
      title: 'CV - Markus Fourie',
      description: 'Professional curriculum vitae with complete work experience and qualifications.',
      type: 'CV',
      icon: FileText,
      downloadUrl: '/cert-docs/251023 Markus Fourie CV.pdf',
      isZip: false,
    },
    {
      title: 'Resume - Markus Fourie',
      description: 'Concise resume highlighting key skills, experience, and achievements.',
      type: 'Resume',
      icon: FileText,
      downloadUrl: '/cert-docs/251023 Markus Fourie Resume.pdf',
      isZip: false,
    },
  ];

  const academicInfo = {
    degree: 'BSc Computer and Information Science Degree (Cum Laude*)',
    institution: 'Varsity College – Pretoria Campus, RSA',
    period: '2023 to December 2025',
    highlights: [
      '*Expected to be received Cum Laude, passing 19 of 20 completed modules with distinctions.',
      '3 Modules of BSc. degree remaining, in final semester up to November 2025.',
      'Invited and joined as member of "Golden Key International Honour Society" in 2025.',
    ]
  };

  return (
    <div className="min-h-screen">
      {/* Scroll Indicator */}
      <ScrollIndicator variant="glossy" />
      
      {/* Header */}
      <section className="w-full px-[var(--container-padding)] py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4">
            <SplitText
              text="Documents & Certifications"
              className="text-4xl md:text-5xl font-bold"
              splitType="words"
              delay={100}
              duration={0.8}
              ease="power3.out"
              from={{ opacity: 0, y: 50, scale: 0.9 }}
              to={{ opacity: 1, y: 0, scale: 1 }}
              tag="h1"
              threshold={0.2}
            />
            <FadeIn delay={0.3} direction="up">
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
                View and download my academic credentials, professional certifications, and official documentation. All documents are verified and up-to-date.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up" className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Certifications & Degrees</h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Official academic qualifications and professional certifications
            </p>
          </FadeIn>

          <StaggerReveal className="grid grid-cols-1 lg:grid-cols-2 gap-6" stagger={0.15}>
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <Card 
                  key={index} 
                  className="hover:shadow-xl transition-all hover:-translate-y-1 group"
                >
                  <CardHeader className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-3 rounded-lg ${cert.bgColor} transition-all group-hover:scale-110`}>
                            <Icon className={`w-6 h-6 ${cert.color}`} />
                          </div>
                          <div>
                            <CardTitle className="group-hover:text-primary transition-colors">
                              {cert.title}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                              {cert.issuer} • {cert.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${cert.bgColor} ${cert.color} text-xs font-medium`}>
                            <CheckCircle2 className="w-3 h-3" />
                            {cert.status}
                          </span>
                          <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                            {cert.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-sm">
                      {cert.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      {cert.verifyUrl ? (
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="flex-1 hover:scale-105 transition-transform"
                          asChild
                        >
                          <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Verify Online
                          </a>
                        </Button>
                      ) : (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 hover:scale-105 transition-transform"
                            asChild
                          >
                            <a href={cert.downloadUrl} download>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </a>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 hover:scale-105 transition-transform"
                            asChild
                          >
                            <a href={cert.downloadUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View
                            </a>
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* Academic Records */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up" className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Academic Records</h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Official transcripts and academic documentation
            </p>
          </FadeIn>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.12}>
            {academicRecords.map((record, index) => {
              const Icon = record.icon;
              return (
                <Card 
                  key={index}
                  className="hover:shadow-lg transition-all hover:-translate-y-1 group cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 transition-all group-hover:scale-110">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {record.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="inline-block px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                            {record.type}
                          </span>
                          {record.isZip && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-xs font-medium">
                              <Archive className="w-3 h-3" />
                              ZIP
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-sm">
                      {record.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full hover:scale-105 transition-transform"
                      asChild
                    >
                      <a href={record.downloadUrl} download>
                        {record.isZip ? (
                          <>
                            <Archive className="w-4 h-4 mr-2" />
                            Download ZIP
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </>
                        )}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up" className="mb-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Academic Achievements</h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Recognized accomplishments throughout my academic journey
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-600/10 transition-all hover:scale-110">
                    <GraduationCap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <CardTitle className="text-2xl text-primary">
                      {academicInfo.degree}
                    </CardTitle>
                    <div className="flex flex-col gap-1 text-muted-foreground">
                      <p className="font-medium">{academicInfo.institution}</p>
                      <p className="text-sm">{academicInfo.period}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-px bg-border w-full"></div>
                <ul className="space-y-3">
                  {academicInfo.highlights.map((highlight, index) => (
                    <li 
                      key={index} 
                      className="flex items-start gap-3 text-base"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-foreground leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-[var(--container-padding)] py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 md:p-12 text-center hover:scale-[1.01] transition-transform backdrop-blur-sm">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Official Documentation?</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                For official transcripts, verification letters, or additional documentation, please contact me directly.
              </p>
              <Button size="lg" asChild className="hover:scale-105 transition-transform">
                <a href="/contact">Get in Touch</a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

