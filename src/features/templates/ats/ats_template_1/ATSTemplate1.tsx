"use client";
import usePhotoURL from "@/hooks/usePhotoURL";
import { cn, convertToUlORP } from "@/lib/utils";
import { skillDefValues } from "@/validations/defaultValues";
import isEqual from "lodash.isequal";
import Image from "next/image";
import {
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaThreads,
  FaXTwitter,
} from "react-icons/fa6";
import { TemplateProps } from "../../types";
import styles from "./styles.module.css";

const ATSTemplate1 = ({ resumeData }: TemplateProps) => {
  const { template } = resumeData;

  const borderRadiusValue =
    template.borderStyle == "circle"
      ? "9999px"
      : template.borderStyle == "square"
        ? "0px"
        : "10%";

  return (
    <div
      className="flex h-full flex-col space-y-8 p-8"
      style={{
        color: template.textHex,
        backgroundColor: template.backdropHex,
        fontFamily: template?.fontFace || "Inter",
      }}
    >
      {/* <pre> {JSON.stringify(resumeData, null, 2)}</pre> */}
      <div>
        <Header resumeData={resumeData} borderRadiusValue={borderRadiusValue} />
      </div>
      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-3">
          <div className="flex flex-col space-y-4">
            <Summary resumeData={resumeData} />
            <WorkExperience resumeData={resumeData} />
            <Educations resumeData={resumeData} />
            <Certifications resumeData={resumeData} />
            <Projects resumeData={resumeData} />
            <Courses resumeData={resumeData} />
            <Hobbies resumeData={resumeData} />
          </div>
        </div>
        <div className="col-span-1 h-full p-4">
          <Skills resumeData={resumeData} />
          <SocialLinks resumeData={resumeData} />
        </div>
      </div>
    </div>
  );
};

const Header = ({ resumeData, borderRadiusValue }: TemplateProps) => {
  const {
    firstName,
    lastName,
    jobTitle,
    email,
    phone,
    city,
    country,
    gender,
    profilePicture,
  } = resumeData.personalDetails;
  const photoURL = usePhotoURL(profilePicture);
  const { template } = resumeData;
  return (
    <div>
      <div className="flex items-start justify-start space-x-8">
        {photoURL && (
          <div
            className="relative aspect-square w-24 overflow-hidden"
            style={{ borderRadius: borderRadiusValue }}
          >
            <Image
              src={photoURL}
              alt="Profile Picture"
              className="h-full w-full object-cover object-center"
              fill
            />
          </div>
        )}
        <div className="flex flex-col">
          <p
            style={{ color: template.accentHex }}
            className={cn(styles.title, "uppercase")}
          >
            {firstName && <span>{firstName}</span>}
            {firstName && lastName && <span>&nbsp;</span>}
            {lastName && <span>{lastName}</span>}
          </p>
          <p style={{ color: template.accentHex }} className={styles.heading}>
            {jobTitle && <span>{jobTitle}</span>}
          </p>
          <p className={styles.para}>
            {email && <span>{email}</span>}
            {email && phone && " • "}
            {phone && <span>{phone}</span>}
          </p>
          <p className={styles.para}>
            {city && <span>{city}</span>}
            {city && country && ", "}
            {country && <span>{country}</span>}
          </p>
          {gender && (
            <p className={styles.para}>
              Gender : <span className="capitalize">{gender}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Summary = ({ resumeData }: TemplateProps) => {
  const { summary } = resumeData.personalDetails;
  const { template } = resumeData;
  return summary ? (
    <div className="flex break-inside-avoid flex-col space-y-1">
      <p
        style={{ color: template.accentHex }}
        className={cn(styles.heading, "uppercase")}
      >
        Professional Summary
      </p>
      <div
        className={cn(styles.para)}
        dangerouslySetInnerHTML={{
          __html: convertToUlORP(summary),
        }}
      />
    </div>
  ) : null;
};

const WorkExperience = ({ resumeData }: TemplateProps) => {
  const { workExperiences } = resumeData;
  const { template } = resumeData;

  return workExperiences && workExperiences?.length > 0 ? (
    <div
      style={{ borderColor: template.accentHex }}
      className="flex flex-col space-y-2 border-t pt-4"
    >
      <p
        style={{ color: template.accentHex }}
        className={cn(styles.heading, "uppercase")}
      >
        Experience
      </p>
      <div className="flex flex-col space-y-4">
        {workExperiences.map((item, index) => (
          <div
            key={"workexp+" + index}
            className="flex break-inside-avoid flex-col"
          >
            <div className="flex items-center justify-between">
              <p className={styles.subHeading}>
                {item.position && <span>{item.position}</span>}
                {item.employer && <span>{" at "}</span>}
                {item.employer && <span>{item.employer}</span>}
                {item.jobType && (
                  <span className="capitalize">
                    {" • "}
                    {item.jobType}
                  </span>
                )}
                {item.location && (
                  <span>
                    {", "}
                    {item.location}
                  </span>
                )}
              </p>
              <p className={styles.para}>
                {item.startDate && <span>{item.startDate}</span>}
                {(item.endDate || item.current) && <span>{" — "}</span>}
                {item.endDate && !item.current && <span>{item.endDate}</span>}
                {item.current && <span>Working</span>}
              </p>
            </div>
            {item.description && (
              <div
                className={cn(styles.para, "mt-1")}
                dangerouslySetInnerHTML={{
                  __html: convertToUlORP(item.description),
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

const Educations = ({ resumeData }: TemplateProps) => {
  const { educationDetails, template } = resumeData;
  return educationDetails && educationDetails?.length > 0 ? (
    <div
      style={{ borderColor: template.accentHex }}
      className="flex flex-col space-y-2 border-t pt-4"
    >
      <p
        style={{ color: template.accentHex }}
        className={cn(styles.heading, "uppercase")}
      >
        Education
      </p>
      <div className="flex flex-col space-y-4">
        {educationDetails.map((item, index) => (
          <div
            key={"educations+" + index}
            className="flex break-inside-avoid flex-col"
          >
            <div className="flex items-center justify-between">
              <p className={styles.subHeading}>
                {item.degree && <span>{item.degree}</span>}
              </p>
              <p className={styles.para}>
                {item.institution && <span>{item.institution}</span>}
                {item.startDate && (
                  <span>
                    {" • "}
                    {item.startDate}
                  </span>
                )}
                {item.endDate && !item.current && (
                  <span>
                    {" - "}
                    {item.endDate}
                  </span>
                )}
                {item.current && (
                  <span>
                    {" - "}
                    {"Studying"}
                  </span>
                )}
              </p>
            </div>
            <p className={styles.para}>
              {item.score && (
                <span>
                  {"Score : "}
                  {item.score}
                </span>
              )}
            </p>
            {item.description && (
              <div
                className={cn(styles.para, "mt-1")}
                dangerouslySetInnerHTML={{
                  __html: convertToUlORP(item.description),
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

const Skills = ({ resumeData }: TemplateProps) => {
  const { hardSkills, softSkills, template } = resumeData;
  return (
    <div className="flex flex-col space-y-8">
      {hardSkills && hardSkills.length > 0 && (
        <div>
          <p
            style={{ color: template.accentHex }}
            className={cn(styles.heading, "mb-2 uppercase")}
          >
            Core skills
          </p>
          <div className="flex flex-col space-y-2">
            {hardSkills?.map((item, index) =>
              !isEqual(item, skillDefValues) ? (
                <div key={"hardSkills-" + index}>
                  <p className={styles.para}>{item.name}</p>
                  {item.level != undefined && !item.levelDisabled && (
                    <div>
                      <span className="relative block h-1 w-full overflow-hidden rounded-full">
                        <span
                          className="absolute left-0 top-0 h-full w-full rounded-full"
                          style={{
                            backgroundColor: template.accentHex,
                            opacity: "25%",
                          }}
                        ></span>
                        <span
                          className="absolute left-0 top-0 h-full"
                          style={{
                            width: (item.level + 1) * 20 + "%",
                            backgroundColor: template.accentHex,
                          }}
                        ></span>
                      </span>
                    </div>
                  )}
                </div>
              ) : null,
            )}
          </div>
        </div>
      )}

      {softSkills && softSkills.length > 0 && (
        <div>
          <p
            style={{ color: template.accentHex }}
            className={cn(styles.heading, "mb-2 uppercase")}
          >
            Soft skills
          </p>
          <div className="flex flex-col space-y-2">
            {softSkills?.map((item, index) =>
              !isEqual(item, skillDefValues) ? (
                <div key={"hardSkills-" + index}>
                  <p className={styles.para}>{item.name}</p>
                  {item.level != undefined && !item.levelDisabled && (
                    <div>
                      <span className="relative block h-1 w-full overflow-hidden rounded-full">
                        <span
                          className="absolute left-0 top-0 h-full w-full rounded-full"
                          style={{
                            backgroundColor: template.accentHex,
                            opacity: "25%",
                          }}
                        ></span>
                        <span
                          className="absolute left-0 top-0 h-full"
                          style={{
                            width: (item.level + 1) * 20 + "%",
                            backgroundColor: template.accentHex,
                          }}
                        ></span>
                      </span>
                    </div>
                  )}
                </div>
              ) : null,
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const SocialLinks = ({ resumeData }: TemplateProps) => {
  const { linkedin, github, instagram, twitter, threads, website, custom } =
    resumeData.socialLinks;
  return linkedin ||
    github ||
    instagram ||
    twitter ||
    threads ||
    website ||
    (custom && custom?.length > 0) ? (
    <div className="mt-16 flex flex-col space-y-2">
      {linkedin && (
        <div>
          <div className="flex items-center justify-start space-x-1">
            <FaLinkedin />
            <span className={styles.subHeading}>LinkedIn</span>
          </div>
          <p className={cn(styles.para, "break-words")}>{linkedin}</p>
        </div>
      )}
      {github && (
        <div>
          <div className="flex items-center justify-start space-x-1">
            <FaGithub />
            <span className={styles.subHeading}>Github</span>
          </div>
          <p className={cn(styles.para, "break-words")}>{github}</p>
        </div>
      )}
      {instagram && (
        <div>
          <div className="flex items-center justify-start space-x-1">
            <FaInstagram />
            <span className={styles.subHeading}>Instagram</span>
          </div>
          <p className={cn(styles.para, "break-words")}>{instagram}</p>
        </div>
      )}

      {twitter && (
        <div>
          <div className="flex items-center justify-start space-x-1">
            <FaXTwitter />
            <span className={styles.subHeading}>Twitter/X</span>
          </div>
          <p className={cn(styles.para, "break-words")}>{twitter}</p>
        </div>
      )}

      {threads && (
        <div>
          <div className="flex items-center justify-start space-x-1">
            <FaThreads />
            <span className={styles.subHeading}>Threads</span>
          </div>
          <p className={cn(styles.para, "break-words")}>{threads}</p>
        </div>
      )}

      {website && (
        <div>
          <div className="flex items-center justify-start space-x-1">
            <FaGlobe />
            <span className={styles.subHeading}>My Website</span>
          </div>
          <p className={cn(styles.para, "break-words")}>{website}</p>
        </div>
      )}

      {custom && custom.length > 0 && (
        <div>
          {custom.map((item, index) => (
            <div key={"custom-social-link-" + index}>
              <div className="flex items-center justify-start space-x-1">
                <span className={styles.subHeading}>{item.label}</span>
              </div>
              <p className={cn(styles.para, "break-words")}>{item.link}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  ) : null;
};

const Projects = ({ resumeData }: TemplateProps) => {
  const { projects, template } = resumeData;
  return projects && projects?.length > 0 ? (
    <div
      style={{ borderColor: template.accentHex }}
      className="flex flex-col space-y-2 border-t pt-4"
    >
      <p
        style={{ color: template.accentHex }}
        className={cn(styles.heading, "uppercase")}
      >
        Projects
      </p>
      <div className="flex flex-col space-y-4">
        {projects.map((item, index) => (
          <div
            key={"project-" + index}
            className="flex break-inside-avoid flex-col"
          >
            <p className={styles.subHeading}>
              {item.name && <span>{item.name}</span>}
            </p>
            <p className={styles.para}>
              {item.link && <span>{item.link}</span>}
            </p>
            {item.description && (
              <div
                className={cn(styles.para, "mt-1")}
                dangerouslySetInnerHTML={{
                  __html: convertToUlORP(item.description),
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

const Certifications = ({ resumeData }: TemplateProps) => {
  const { certifications, template } = resumeData;
  return certifications && certifications?.length > 0 ? (
    <div
      style={{ borderColor: template.accentHex }}
      className="flex flex-col space-y-2 border-t pt-4"
    >
      <p
        style={{ color: template.accentHex }}
        className={cn(styles.heading, "uppercase")}
      >
        Certifications
      </p>
      <div className="flex flex-col space-y-4">
        {certifications.map((item, index) => (
          <div
            key={"certification-" + index}
            className="flex break-inside-avoid flex-col"
          >
            <p className={styles.subHeading}>
              {item.title && <span>{item.title}</span>}
              {item.organization && (
                <>
                  <span>{" • "}</span>
                  <span>{item.organization}</span>
                </>
              )}
              {item.link && (
                <>
                  <span>{" • "}</span>
                  <a href={item.link}>{item.link}</a>
                </>
              )}
            </p>
            <p className={styles.para}>
              {item.score && (
                <span>
                  {"Score : "}
                  {item.score}
                </span>
              )}
            </p>
            {item.description && (
              <div
                className={cn(styles.para, "mt-1")}
                dangerouslySetInnerHTML={{
                  __html: convertToUlORP(item.description),
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

const Courses = ({ resumeData }: TemplateProps) => {
  const { courses, template } = resumeData;
  return courses && courses.length > 0 ? (
    <div
      style={{ borderColor: template.accentHex }}
      className="flex flex-col space-y-2 border-t pt-4"
    >
      <p
        style={{ color: template.accentHex }}
        className={cn(styles.heading, "uppercase")}
      >
        Courses
      </p>
      <div className="flex flex-col space-y-4">
        {courses.map((item, index) => (
          <div
            key={"certification-" + index}
            className="flex break-inside-avoid flex-col"
          >
            <p className={styles.subHeading}>
              {item.title && <span>{item.title}</span>}
              {item.organization && (
                <>
                  <span>{" • "}</span>
                  <span>{item.organization}</span>
                </>
              )}
              {item.link && (
                <>
                  <span>{" • "}</span>
                  <a href={item.link}>{item.link}</a>
                </>
              )}
            </p>
            <p className={styles.para}>
              {item.score && (
                <span>
                  {"Score : "}
                  {item.score}
                </span>
              )}
            </p>
            {item.description && (
              <div
                className={cn(styles.para, "mt-1")}
                dangerouslySetInnerHTML={{
                  __html: convertToUlORP(item.description),
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

const Hobbies = ({ resumeData }: TemplateProps) => {
  const { hobbies, template } = resumeData;
  return hobbies && hobbies?.length > 0 ? (
    <div
      style={{ borderColor: template.accentHex }}
      className="flex flex-col space-y-2 border-t pt-4"
    >
      <p
        style={{ color: template.accentHex }}
        className={cn(styles.heading, "uppercase")}
      >
        Hobbies
      </p>
      <div className="grid grid-cols-2 gap-4">
        {hobbies.map((item, index) => (
          <div
            key={"certification-" + index}
            className="flex break-inside-avoid flex-col"
          >
            <p className={styles.subHeading}>
              {item.name && <span>{item.name}</span>}
            </p>
            {item.description && (
              <div
                className={cn(styles.para, "mt-1")}
                dangerouslySetInnerHTML={{
                  __html: convertToUlORP(item.description),
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default ATSTemplate1;
