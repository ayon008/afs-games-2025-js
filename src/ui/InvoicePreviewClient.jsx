import { useState } from "react";

const InvoiceModal = ({ invoiceURL }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Table cell with clickable text */}
            {invoiceURL && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="text-[#FFE500] underline"
                >
                    Invoice URL
                </button>
            )}

            {/* DaisyUI Modal */}
            {isOpen && (
                <dialog open className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box bg-base-100 text-base-content max-w-4xl w-full">
                        <h3 className="font-bold text-lg mb-3">Invoice Preview</h3>

                        {/* PDF preview area */}
                        <div className="w-full h-[70vh] border rounded-lg overflow-hidden">
                            <iframe
                                src={invoiceURL}
                                title="Invoice PDF"
                                className="w-full h-full"
                            ></iframe>
                        </div>

                        {/* Footer buttons */}
                        <div className="modal-action flex justify-between items-center mt-4">
                            <a
                                href={invoiceURL}
                                download
                                className="btn btn-sm bg-[#FFE500] text-black hover:bg-[#e6d200]"
                            >
                                Download PDF
                            </a>
                            <button
                                className="btn btn-sm"
                                onClick={() => setIsOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
};

export default InvoiceModal;
