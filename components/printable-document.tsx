import type { DemoDocument } from "@/lib/demo-documents"
import { addWatermark } from "@/lib/watermark"

interface PrintableDocumentProps {
  document: DemoDocument
}

export function PrintableDocument({ document }: PrintableDocumentProps) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const watermarkText = `Holy Angel University Registrar - ${currentDate}`

  return (
    <div className="bg-white text-black p-12 min-h-screen print:p-8">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-black pb-6">
        <h1 className="text-2xl font-bold mb-2">HOLY ANGEL UNIVERSITY</h1>
        <p className="text-sm">Office of the University Registrar</p>
        <p className="text-sm">Angeles City, Pampanga, Philippines</p>
      </div>

      {/* Document Title */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold uppercase underline decoration-2 underline-offset-4">{document.type}</h2>
      </div>

      {/* Document Content */}
      <div className="space-y-6 mb-12">
        {/* Student Information */}
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-semibold">Document ID:</span> {document.id}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Student Name:</span> {document.studentInfo.name}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Student ID:</span> {document.studentInfo.studentId}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Program:</span> {document.studentInfo.program}
          </p>
          {document.studentInfo.yearLevel && (
            <p className="text-sm">
              <span className="font-semibold">Year Level:</span> {document.studentInfo.yearLevel}
            </p>
          )}
          {document.studentInfo.academicYear && (
            <p className="text-sm">
              <span className="font-semibold">Academic Year:</span> {document.studentInfo.academicYear}
            </p>
          )}
        </div>

        {/* Document-specific content */}
        {document.type === "Certificate of Good Moral Character" && (
          <div className="my-8 text-sm leading-relaxed">
            <p className="mb-4">To Whom It May Concern:</p>
            <p className="mb-4 indent-8">
              This is to certify that <span className="font-semibold">{document.studentInfo.name}</span>, a bonafide
              student of Holy Angel University, has no derogatory record on file in this office.
            </p>
            <p className="mb-4 indent-8">
              This certification is being issued upon the request of the above-named student for whatever legal purpose
              it may serve.
            </p>
          </div>
        )}

        {document.type === "Certificate of Enrollment" && document.details && (
          <div className="my-8 text-sm leading-relaxed">
            <p className="mb-4">To Whom It May Concern:</p>
            <p className="mb-4 indent-8">
              This is to certify that <span className="font-semibold">{document.studentInfo.name}</span> is currently
              enrolled at Holy Angel University for the {document.details.semester} of Academic Year{" "}
              {document.studentInfo.academicYear}.
            </p>
            {document.details.units && (
              <p className="mb-4 indent-8">
                The student is taking <span className="font-semibold">{document.details.units} units</span> this
                semester.
              </p>
            )}
          </div>
        )}

        {document.type === "Diploma" && document.details?.graduationDate && (
          <div className="my-8 text-sm leading-relaxed text-center">
            <p className="mb-6 text-base">This is to certify that</p>
            <p className="text-2xl font-bold mb-6">{document.studentInfo.name}</p>
            <p className="mb-4">has satisfactorily completed the requirements for the degree of</p>
            <p className="text-lg font-semibold mb-6">{document.studentInfo.program}</p>
            <p className="mb-4">and is hereby awarded this diploma on {document.details.graduationDate}</p>
            {document.details.gpa && (
              <p className="text-sm mt-8">
                With a General Weighted Average of{" "}
                <span className="font-semibold">{document.details.gpa.toFixed(2)}</span>
              </p>
            )}
          </div>
        )}

        {(document.type === "Transcript of Records" || document.type === "Certificate of Grades") &&
          document.details?.gpa && (
            <div className="my-8 text-sm">
              <p className="mb-2">
                <span className="font-semibold">General Weighted Average:</span> {document.details.gpa.toFixed(2)}
              </p>
              {document.details.units && (
                <p className="mb-2">
                  <span className="font-semibold">Total Units Earned:</span> {document.details.units}
                </p>
              )}
              {document.details.semester && (
                <p className="mb-2">
                  <span className="font-semibold">Semester:</span> {document.details.semester}
                </p>
              )}
            </div>
          )}

        {document.type === "Honorable Dismissal" && (
          <div className="my-8 text-sm leading-relaxed">
            <p className="mb-4">To Whom It May Concern:</p>
            <p className="mb-4 indent-8">
              This is to certify that <span className="font-semibold">{document.studentInfo.name}</span> was a student
              of Holy Angel University and is hereby granted Honorable Dismissal.
            </p>
            <p className="mb-4 indent-8">
              The student has no pending obligations with the university and is in good standing.
            </p>
            {document.details?.gpa && (
              <p className="mb-4 indent-8">
                General Weighted Average: <span className="font-semibold">{document.details.gpa.toFixed(2)}</span>
              </p>
            )}
          </div>
        )}

        {document.type === "Certificate of Transfer Credential" && (
          <div className="my-8 text-sm leading-relaxed">
            <p className="mb-4">To Whom It May Concern:</p>
            <p className="mb-4 indent-8">
              This is to certify that <span className="font-semibold">{document.studentInfo.name}</span> is eligible to
              transfer credentials from Holy Angel University.
            </p>
            <p className="mb-4 indent-8">
              The student has settled all financial and academic obligations with the university.
            </p>
          </div>
        )}

        {document.type === "Certificate of Graduation" && document.details?.graduationDate && (
          <div className="my-8 text-sm leading-relaxed">
            <p className="mb-4">To Whom It May Concern:</p>
            <p className="mb-4 indent-8">
              This is to certify that <span className="font-semibold">{document.studentInfo.name}</span> has completed
              all the requirements for graduation and will be conferred the degree of {document.studentInfo.program} on{" "}
              {document.details.graduationDate}.
            </p>
            {document.details.gpa && (
              <p className="mb-4 indent-8">
                General Weighted Average: <span className="font-semibold">{document.details.gpa.toFixed(2)}</span>
              </p>
            )}
          </div>
        )}

        {/* Issue Date */}
        <div className="mt-8 text-sm">
          <p>
            <span className="font-semibold">Date Issued:</span> {currentDate}
          </p>
        </div>

        {/* Watermark */}
        <div className="mt-8 text-xs text-gray-400">
          <p>{addWatermark("", watermarkText)}</p>
        </div>
      </div>

      {/* Footer/Signature Section */}
      <div className="mt-16 pt-8 border-t border-black">
        <div className="flex justify-between items-end">
          <div className="text-center">
            <div className="border-t border-black w-48 mb-2"></div>
            <p className="text-xs font-semibold">University Registrar</p>
          </div>
          <div className="text-center">
            <div className="border-t border-black w-48 mb-2"></div>
            <p className="text-xs font-semibold">Date</p>
          </div>
        </div>
      </div>

      {/* Document Footer */}
      <div className="mt-8 text-center text-xs text-gray-600">
        <p>This is a computer-generated document. No signature is required.</p>
        <p>Document ID: {document.id}</p>
      </div>
    </div>
  )
}

export function sendDocumentToEmail(email: string, document: DemoDocument) {
  // Simulate sending document to email instantly
  // In production, integrate with an email service (e.g., SendGrid, SES)
  const docText = JSON.stringify(document, null, 2);
  console.log(`Document sent to ${email}:\n${docText}`);
  alert(`A digital copy of your document/receipt has been sent to ${email}.`);
}
