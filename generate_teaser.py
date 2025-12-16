"""
PDF Teaser Generator for Vigilcap Website
==========================================
This script extracts the first 2 pages from a PDF and converts them to PNG images
for use as a teaser on the website.

USAGE:
    python generate_teaser.py [pdf_file]

If no PDF file is specified, it will use 'Vigilcap_Report_juice-shop-master.pdf' by default.

REQUIREMENTS:
    - Python 3.x
    - pdf2image: pip install pdf2image
    - Pillow: pip install Pillow
    - Poppler: Download from https://github.com/osber/pdf2image and add to PATH
      OR set POPPLER_PATH below

UPDATING THE TEASER:
    1. Replace the PDF file in this directory
    2. Run: python generate_teaser.py your_new_file.pdf
    3. The script will generate report-page-1.png and report-page-2.png
"""

import os
import sys

# Try pdf2image, fall back to PyMuPDF if not available
try:
    from pdf2image import convert_from_path
    USE_PDF2IMAGE = True
except ImportError:
    USE_PDF2IMAGE = False

try:
    import fitz  # PyMuPDF
    USE_PYMUPDF = True
except ImportError:
    USE_PYMUPDF = False

# Configuration
DEFAULT_PDF = "Vigilcap_Report_juice-shop-master.pdf"
OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))
DPI = 150  # Resolution for output images
PAGES_TO_EXTRACT = 2

# Windows Poppler path (update this if poppler is installed elsewhere)
POPPLER_PATH = None  # Set to r"C:\path\to\poppler\bin" if needed

def extract_with_pymupdf(pdf_path, output_dir, num_pages=2):
    """Extract pages using PyMuPDF (fitz)"""
    doc = fitz.open(pdf_path)
    
    for page_num in range(min(num_pages, len(doc))):
        page = doc[page_num]
        # Render at 2x for better quality
        mat = fitz.Matrix(2, 2)
        pix = page.get_pixmap(matrix=mat)
        output_path = os.path.join(output_dir, f"report-page-{page_num + 1}.png")
        pix.save(output_path)
        print(f"Created: {output_path}")
    
    doc.close()
    return True

def extract_with_pdf2image(pdf_path, output_dir, num_pages=2):
    """Extract pages using pdf2image (requires Poppler)"""
    try:
        kwargs = {
            'dpi': DPI,
            'first_page': 1,
            'last_page': num_pages
        }
        if POPPLER_PATH:
            kwargs['poppler_path'] = POPPLER_PATH
            
        images = convert_from_path(pdf_path, **kwargs)
        
        for i, image in enumerate(images):
            output_path = os.path.join(output_dir, f"report-page-{i + 1}.png")
            image.save(output_path, 'PNG')
            print(f"Created: {output_path}")
        
        return True
    except Exception as e:
        print(f"pdf2image error: {e}")
        print("Try installing Poppler or use PyMuPDF instead: pip install PyMuPDF")
        return False

def main():
    # Get PDF file from command line or use default
    if len(sys.argv) > 1:
        pdf_file = sys.argv[1]
    else:
        pdf_file = DEFAULT_PDF
    
    pdf_path = os.path.join(OUTPUT_DIR, pdf_file) if not os.path.isabs(pdf_file) else pdf_file
    
    # Check if file exists
    if not os.path.exists(pdf_path):
        print(f"Error: PDF file not found: {pdf_path}")
        sys.exit(1)
    
    print(f"Extracting first {PAGES_TO_EXTRACT} pages from: {pdf_path}")
    print(f"Output directory: {OUTPUT_DIR}")
    print("-" * 50)
    
    # Try PyMuPDF first (more reliable on Windows)
    if USE_PYMUPDF:
        print("Using PyMuPDF for extraction...")
        success = extract_with_pymupdf(pdf_path, OUTPUT_DIR, PAGES_TO_EXTRACT)
    elif USE_PDF2IMAGE:
        print("Using pdf2image for extraction...")
        success = extract_with_pdf2image(pdf_path, OUTPUT_DIR, PAGES_TO_EXTRACT)
    else:
        print("Error: No PDF library available!")
        print("Install one of the following:")
        print("  pip install PyMuPDF")
        print("  pip install pdf2image (also requires Poppler)")
        sys.exit(1)
    
    if success:
        print("-" * 50)
        print("Done! Teaser images created successfully.")
        print("Files created:")
        print("  - report-page-1.png")
        print("  - report-page-2.png")
    else:
        sys.exit(1)

if __name__ == "__main__":
    main()
