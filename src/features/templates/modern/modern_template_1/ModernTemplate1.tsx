"use client";
import React from "react";
import { TemplateProps } from "../../types";
import Image from "next/image";
import usePhotoURL from "@/hooks/usePhotoURL";
import styles from "./style.module.css";
import { cn, convertToUlORP } from "@/lib/utils";
import { Mail, Phone } from "lucide-react";
import {
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaThreads,
  FaXTwitter,
} from "react-icons/fa6";

const ModernTemplate1 = ({ resumeData }: TemplateProps) => {
  const {
    personalDetails,
    educationDetails,
    workExperiences,
    template,
    hardSkills,
    softSkills,
    projects,
    socialLinks,
  } = resumeData;

  const borderRadiusValue =
    template.borderStyle == "circle"
      ? "9999px"
      : template.borderStyle == "square"
        ? "0px"
        : "10%";

  const photoURL = usePhotoURL(personalDetails.profilePicture);

  return (
    <div
      className="p-8"
      style={{
        color: template.textHex,
        backgroundColor: template.backdropHex,
        fontFamily: template?.fontFace || "Inter",
      }}
    >
      {/* Header */}
      <div className="flex flex-col items-center justify-center gap-y-2">
        {photoURL && (
          <div
            className="relative aspect-square w-20 overflow-hidden border"
            style={{
              borderRadius: borderRadiusValue,
              borderColor: template.accentHex,
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
        <div>
          <h1
            style={{ color: template.accentHex }}
            className="text-center text-xl font-bold capitalize"
          >
            {personalDetails.firstName + " " + personalDetails.lastName}
          </h1>
          <p
            style={{ color: template.accentHex }}
            className={cn(styles.subHeading, "text-center")}
          >
            {personalDetails.jobTitle}
          </p>
          <p
            className={cn(
              styles.para,
              "flex items-center justify-center gap-x-2 text-center",
            )}
          >
            <span className="flex items-center justify-center gap-x-1">
              <Mail className="size-3" />
              {personalDetails.email}
            </span>
            <span className="flex items-center justify-center gap-x-1">
              <Phone className="size-3" />
              {personalDetails.phone}
            </span>
          </p>
          <p className={cn(styles.para, "text-center")}>
            <span>{personalDetails.country}</span>
            {personalDetails.city && <span>{", "}</span>}
            <span>{personalDetails.city}</span>
          </p>
        </div>
      </div>

      {/* content */}
      <div className="mt-8 grid grid-cols-4">
        <div className="col-span-1">
          {/* skills */}
          <div>
            <h1
              style={{ color: template.accentHex }}
              className={cn(styles.heading, "mb-2 uppercase")}
            >
              Core skills
            </h1>
            <div className="flex flex-col gap-y-1">
              {hardSkills?.map((item, index) => (
                <div
                  key={"hardSkills+" + index}
                  className="flex flex-wrap items-start justify-start gap-2"
                >
                  <span
                    style={{
                      borderColor: template.accentHex,
                      borderRadius: borderRadiusValue,
                    }}
                    className={cn(styles.para, `border px-[8px] py-[2px]`)}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* soft skills */}
          <div className="mt-8">
            <h1
              style={{ color: template.accentHex }}
              className={cn(styles.heading, "mb-2")}
            >
              Soft skills
            </h1>
            <div className="flex flex-col gap-y-1">
              {softSkills?.map((item, index) => (
                <div
                  key={"softSkills+" + index}
                  className="flex flex-wrap items-start justify-start gap-2"
                >
                  <span
                    style={{
                      borderColor: template.accentHex,
                      borderRadius: borderRadiusValue,
                    }}
                    className={cn(
                      styles.para,
                      `border px-[8px] py-[2px] text-[${resumeData.template.textHex}]`,
                    )}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/*social links  */}

          <div className="mt-8">
            <h1
              style={{ color: template.accentHex }}
              className={cn(styles.heading, "mb-2")}
            >
              Social Links
            </h1>
            <div className="flex flex-col space-y-2">
              {socialLinks.linkedin && (
                <div>
                  <div className="flex items-center justify-start space-x-1">
                    <FaLinkedin />
                    <span className={styles.subHeading}>LinkedIn</span>
                  </div>
                  <p className={cn(styles.para, "break-words")}>
                    {socialLinks.linkedin}
                  </p>
                </div>
              )}
              {socialLinks.github && (
                <div>
                  <div className="flex items-center justify-start space-x-1">
                    <FaGithub />
                    <span className={styles.subHeading}>Github</span>
                  </div>
                  <p className={styles.para}>{socialLinks.github}</p>
                </div>
              )}
              {socialLinks.instagram && (
                <div>
                  <div className="flex items-center justify-start space-x-1">
                    <FaInstagram />
                    <span className={styles.subHeading}>Instagram</span>
                  </div>
                  <p className={styles.para}>{socialLinks.instagram}</p>
                </div>
              )}

              {socialLinks.twitter && (
                <div>
                  <div className="flex items-center justify-start space-x-1">
                    <FaXTwitter />
                    <span className={styles.subHeading}>Twitter/X</span>
                  </div>
                  <p className={styles.para}>{socialLinks.twitter}</p>
                </div>
              )}

              {socialLinks.threads && (
                <div>
                  <div className="flex items-center justify-start space-x-1">
                    <FaThreads />
                    <span className={styles.subHeading}>Threads</span>
                  </div>
                  <p className={styles.para}>{socialLinks.threads}</p>
                </div>
              )}

              {socialLinks.website && (
                <div>
                  <div className="flex items-center justify-start space-x-1">
                    <FaGlobe />
                    <span className={styles.subHeading}>My Website</span>
                  </div>
                  <p className={styles.para}>{socialLinks.website}</p>
                </div>
              )}

              {socialLinks.custom && socialLinks.custom.length > 0 && (
                <div>
                  {socialLinks.custom.map((item, index) => (
                    <div key={"custom-social-link-" + index}>
                      <div className="flex items-center justify-start space-x-1">
                        <span className={styles.subHeading}>{item.label}</span>
                      </div>
                      <p className={styles.para}>{item.link}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-3 ps-4">
          {/* summary */}
          {personalDetails.summary && (
            <div
              style={{ borderColor: template.accentHex }}
              className={`flex break-inside-avoid flex-col gap-y-2 border-b-2 pb-4`}
            >
              <p
                style={{ color: template.accentHex }}
                className={cn(styles.heading, "uppercase")}
              >
                Professional Summary
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
            style={{ borderColor: template.accentHex }}
            className="mt-4 border-b-2 pb-4"
          >
            <div className="flex flex-col gap-y-2">
              <p
                style={{ color: template.accentHex }}
                className={cn(styles.heading, "uppercase")}
              >
                Professional Experience
              </p>
              <div>
                {workExperiences?.map((item, index) => (
                  <div
                    key={"workexp+" + index}
                    className={cn(
                      styles.bullet_lister,
                      "relative flex break-inside-avoid flex-col pb-2",
                    )}
                  >
                    <span
                      style={{
                        backgroundColor: template.accentHex,
                      }}
                      className={styles.progress_bullet}
                    ></span>
                    <span
                      style={{
                        backgroundColor: template.accentHex,
                        opacity: 0.25,
                      }}
                      className={styles.progress_line}
                    ></span>
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
              style={{ borderColor: template.accentHex }}
              className="mt-4 border-b-2 pb-4"
            >
              <div className="flex flex-col gap-y-2">
                <p
                  style={{ color: template.accentHex }}
                  className={cn(styles.heading, "uppercase")}
                >
                  Education
                </p>
                <div>
                  {educationDetails?.map((item, index) => (
                    <div
                      key={"educations+" + index}
                      className={cn(
                        styles.bullet_lister,
                        "relative flex break-inside-avoid flex-col",
                      )}
                    >
                      <span
                        style={{
                          backgroundColor: template.accentHex,
                        }}
                        className={styles.progress_bullet}
                      ></span>
                      <span
                        style={{
                          backgroundColor: template.accentHex,
                          opacity: 0.25,
                        }}
                        className={styles.progress_line}
                      ></span>

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
              style={{ borderColor: template.accentHex }}
              className="mt-4 border-b-2 pb-4"
            >
              <div className="flex break-inside-avoid flex-col gap-y-2">
                <p
                  style={{ color: template.accentHex }}
                  className={cn(styles.heading, "uppercase")}
                >
                  Projects
                </p>
                <div>
                  {projects?.map((item, index) => (
                    <div
                      key={"project+" + index}
                      className={cn(
                        styles.bullet_lister,
                        "relative flex break-inside-avoid flex-col",
                      )}
                    >
                      <span
                        style={{
                          backgroundColor: template.accentHex,
                        }}
                        className={styles.progress_bullet}
                      ></span>
                      <span
                        style={{
                          backgroundColor: template.accentHex,
                          opacity: 0.25,
                        }}
                        className={styles.progress_line}
                      ></span>

                      <p className={styles.subHeading}>
                        {item.name && <span>{item.name}</span>}
                      </p>
                      <p className={styles.para}>
                        {item.date && <span>{item.date}</span>}
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
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate1;
