"use client";
import usePhotoURL from "@/hooks/usePhotoURL";
import { cn, convertToUlORP } from "@/lib/utils";
import { SocialLinksValues } from "@/validations/validation";
import Image from "next/image";
import { TemplateProps } from "../../types";
import styles from "./style.module.css";

const SimpleTemplate1 = ({ resumeData }: TemplateProps) => {
  const {
    personalDetails,
    educationDetails,
    workExperiences,
    template,
    hardSkills,
    softSkills,
    projects,
    certifications,
    courses,
    hobbies,
    socialLinks,
  } = resumeData;

  const fontSizeFactors = {
    small: 0.8,
    medium: 1.2,  
    large: 1.5,
  };

  const borderRadiusValue =
    template.borderStyle == "circle"
      ? "9999px"
      : template.borderStyle == "square"
        ? "0px"
        : "10%";

  const photoURL = usePhotoURL(personalDetails.profilePicture);

  return (
    <div
      className="h-full p-8"
      style={{
        color: template.textHex,
        backgroundColor: template.backdropHex,
        fontFamily: template?.fontFace || "Inter",
      }}
    >
      <div className="">
        <div
          className={cn(
            "flex items-start",
            photoURL ? "justify-start" : "justify-center",
          )}
        >
          {photoURL && (
            <div
              className="relative me-8 aspect-square w-20 overflow-hidden"
              style={{
                borderRadius: borderRadiusValue,
              }}
            >
              <Image
                src={photoURL}
                alt="Profile Image"
                fill
                className="object-cover"
              />
            </div>
          )}

          <div
            className={cn(
              "flex flex-1 flex-col",
              photoURL ? "items-start" : "items-center",
            )}
          >
            <h1
              style={{
                fontSize: template.fontSize
                  ? 16 * fontSizeFactors[template.fontSize]
                  : 16,
              }}
              className="w-max font-bold capitalize"
            >
              {personalDetails.firstName + " " + personalDetails.lastName}
            </h1>
            <p className={cn(styles.subHeading, "w-max")}>
              {personalDetails.jobTitle}
            </p>
            <p className={cn(styles.para, "flex w-max items-center gap-x-1")}>
              <span className="flex items-center justify-center gap-x-1">
                {personalDetails.email}
              </span>
              <span className="flex items-center justify-center gap-x-1">
                {personalDetails.phone}
              </span>
              <span>{personalDetails.country}</span>
              {personalDetails.city && <span>{", "}</span>}
              <span>{personalDetails.city}</span>
            </p>
          </div>
        </div>

        <div className="mt-8">
          {/* summary */}
          {personalDetails.summary && (
            <div
              style={{ borderColor: template.textHex }}
              className={`flex break-inside-avoid flex-col gap-y-2 border-t-2 pt-4`}
            >
              <p
                style={{
                  color: template.textHex,
                  backgroundColor: template.accentHex,
                }}
                className={cn(
                  styles.heading,
                  "w-full py-2 text-center uppercase",
                )}
              >
                Summary
              </p>
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: convertToUlORP(personalDetails.summary),
                }}
              />
            </div>
          )}

          {/* Work Experiences */}
          <div
            style={{ borderColor: template.textHex }}
            className="mt-4 border-t-2 pt-4"
          >
            <div className="flex flex-col gap-y-2">
              <p
                style={{
                  color: template.textHex,
                  backgroundColor: template.accentHex,
                }}
                className={cn(styles.heading, "py-2 text-center uppercase")}
              >
                Professional Experience
              </p>
              <div className="flex flex-col space-y-4">
                {workExperiences?.map((item, index) => (
                  <div
                    key={"workexp+" + index}
                    className={cn(
                      styles.bullet_lister,
                      "relative flex break-inside-avoid flex-col",
                    )}
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
                        {item.endDate && !item.current && (
                          <span>{item.endDate}</span>
                        )}
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
          </div>

          {/* educations*/}

          {educationDetails && educationDetails?.length > 0 && (
            <div
              style={{ borderColor: template.textHex }}
              className="mt-4 border-t-2 pt-4"
            >
              <div className="flex flex-col gap-y-2">
                <p
                  style={{
                    color: template.textHex,
                    backgroundColor: template.accentHex,
                  }}
                  className={cn(styles.heading, "py-2 text-center uppercase")}
                >
                  Education
                </p>
                <div className="flex flex-col space-y-4">
                  {educationDetails?.map((item, index) => (
                    <div
                      key={"educations+" + index}
                      className={cn(
                        styles.bullet_lister,
                        "relative flex break-inside-avoid flex-col",
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <p className={styles.subHeading}>
                          {item.degree && <span>{item.degree}</span>}
                          {item.institution && (
                            <span>
                              {" ("}
                              {item.institution}
                              {")"}
                            </span>
                          )}
                        </p>
                        <p className={styles.para}>
                          {item.startDate && <span>{item.startDate}</span>}
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
            </div>
          )}

          {/* projects */}
          {projects && projects?.length > 0 && (
            <div
              style={{ borderColor: template.textHex }}
              className="mt-4 border-t-2 pt-4"
            >
              <div className="flex break-inside-avoid flex-col gap-y-2">
                <p
                  style={{
                    color: template.textHex,
                    backgroundColor: template.accentHex,
                  }}
                  className={cn(styles.heading, "py-2 text-center uppercase")}
                >
                  Projects
                </p>
                <div className="flex flex-col space-y-4">
                  {projects?.map((item, index) => (
                    <div
                      key={"project+" + index}
                      className={cn(
                        "relative flex break-inside-avoid flex-col",
                      )}
                    >
                      <div className="flex items-center justify-between gap-x-2">
                        <p className={styles.subHeading}>
                          {item.name && <span>{item.name}</span>}
                        </p>
                        <p className={styles.para}>
                          {item.startDate && <span>{item.startDate}</span>}
                          {item.endDate && (
                            <span>
                              {" — "}
                              {item.endDate}
                            </span>
                          )}
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
            </div>
          )}

          {/* skills */}
          {((hardSkills && hardSkills?.length > 0) ||
            (softSkills && softSkills?.length > 0)) && (
            <div
              style={{ borderColor: template.textHex }}
              className="mt-4 border-t-2 pt-4"
            >
              <div className="flex break-inside-avoid flex-col gap-y-2">
                <p
                  style={{
                    color: template.textHex,
                    backgroundColor: template.accentHex,
                  }}
                  className={cn(styles.heading, "py-2 text-center uppercase")}
                >
                  Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {hardSkills?.map((skill, index) => (
                    <span
                      style={{ borderRadius: borderRadiusValue }}
                      className="flex items-center justify-between space-x-2 border px-2 py-[2px] text-sm"
                      key={"hardSkill-" + index}
                    >
                      <span>{skill.name}</span>
                      {!skill.levelDisabled && (
                        <span className="text-xs">
                          {"("}
                          {skill.level}
                          {"/5)"}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {softSkills?.map((skill, index) => (
                    <span
                      style={{ borderRadius: borderRadiusValue }}
                      className="flex items-center justify-between space-x-2 border px-2 py-[2px] text-sm"
                      key={"hardSkill-" + index}
                    >
                      <span>{skill.name}</span>
                      {!skill.levelDisabled && (
                        <span className="text-xs">
                          {"("}
                          {skill.level}
                          {"/5)"}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* certifications */}
          {certifications && certifications?.length > 0 && (
            <div
              style={{ borderColor: template.textHex }}
              className="mt-4 border-t-2 pt-4"
            >
              <div className="flex break-inside-avoid flex-col gap-y-2">
                <p
                  style={{
                    color: template.textHex,
                    backgroundColor: template.accentHex,
                  }}
                  className={cn(styles.heading, "py-2 text-center uppercase")}
                >
                  Certifications
                </p>
                <div className="flex flex-col space-y-4">
                  {certifications?.map((item, index) => (
                    <div
                      key={"certification-+" + index}
                      className={cn(
                        styles.bullet_lister,
                        "relative flex break-inside-avoid flex-col",
                      )}
                    >
                      <p className={styles.subHeading}>
                        {item.title && <span>{item.title}</span>}
                        {item.organization && (
                          <span>
                            {" ("}
                            {item.organization}
                            {")"}
                          </span>
                        )}
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
            </div>
          )}

          {/* courses */}
          {courses && courses?.length > 0 && (
            <div
              style={{ borderColor: template.textHex }}
              className="mt-4 border-t-2 pt-4"
            >
              <div className="flex break-inside-avoid flex-col gap-y-2">
                <p
                  style={{
                    color: template.textHex,
                    backgroundColor: template.accentHex,
                  }}
                  className={cn(styles.heading, "py-2 text-center uppercase")}
                >
                  courses
                </p>
                <div className="flex flex-col space-y-4">
                  {courses?.map((item, index) => (
                    <div
                      key={"course-+" + index}
                      className={cn(
                        "relative flex break-inside-avoid flex-col",
                      )}
                    >
                      <p className={styles.subHeading}>
                        {item.title && <span>{item.title}</span>}
                        {item.organization && (
                          <span>
                            {" ("}
                            {item.organization}
                            {")"}
                          </span>
                        )}
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
            </div>
          )}

          {/* hobbies */}
          {hobbies && hobbies?.length > 0 && (
            <div
              style={{ borderColor: template.textHex }}
              className="mt-4 border-t-2 pt-4"
            >
              <div className="flex break-inside-avoid flex-col gap-y-2">
                <p
                  style={{
                    color: template.textHex,
                    backgroundColor: template.accentHex,
                  }}
                  className={cn(styles.heading, "py-2 text-center uppercase")}
                >
                  hobbies
                </p>
                <div className="flex flex-col space-y-4">
                  {hobbies?.map((item, index) => (
                    <div
                      key={"hobby-+" + index}
                      className={cn(
                        "relative flex break-inside-avoid flex-col",
                      )}
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
            </div>
          )}

          {/* social Links */}
          {socialLinks && (
            <div
              style={{ borderColor: template.textHex }}
              className="mt-4 border-t-2 pt-4"
            >
              <div className="flex break-inside-avoid flex-col gap-y-2">
                <p
                  style={{
                    color: template.textHex,
                    backgroundColor: template.accentHex,
                  }}
                  className={cn(styles.heading, "py-2 text-center uppercase")}
                >
                  Links
                </p>
                <div className="grid grid-cols-2 gap-x-2">
                  {Object.keys(socialLinks).map((key) => {
                    const value = socialLinks[key as keyof SocialLinksValues];

                    // Handle the 'custom' array separately
                    if (key === "custom" && Array.isArray(value)) {
                      return value.map((item, index) => (
                        <div key={`custom-${index}`}>
                          {item.label && item.link && (
                            <p className={cn(styles.para, "break-words")}>
                              {item.label} : {item.link}
                            </p>
                          )}
                        </div>
                      ));
                    }

                    // Render regular string properties
                    if (typeof value === "string") {
                      return (
                        <p className={cn(styles.para, "break-words")} key={key}>
                          {key} : {value}
                        </p>
                      );
                    }

                    return null; // Skip if it's not a string or custom array
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleTemplate1;
