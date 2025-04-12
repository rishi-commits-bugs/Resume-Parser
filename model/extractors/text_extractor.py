"""Text extraction functionality from various file types"""
import os
import io
import PyPDF2
import docx


class TextExtractor:
    """
    Handles extraction of text from various file formats
    """
    
    @staticmethod
    def extract_text_from_pdf(pdf_file):
        """Extract text from PDF file"""
        text = ""
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        for page_num in range(len(pdf_reader.pages)):
            text += pdf_reader.pages[page_num].extract_text()
        return text

    @staticmethod
    def extract_text_from_docx(docx_file):
        """Extract text from DOCX file"""
        doc = docx.Document(docx_file)
        full_text = []
        for para in doc.paragraphs:
            full_text.append(para.text)
        return '\n'.join(full_text)

    @staticmethod
    def extract_text_from_file(file_path):
        """Extract text based on file extension"""
        file_extension = os.path.splitext(file_path)[1].lower()

        if file_extension == '.pdf':
            with open(file_path, 'rb') as file:
                return TextExtractor.extract_text_from_pdf(file)
        elif file_extension == '.docx':
            return TextExtractor.extract_text_from_docx(file_path)
        elif file_extension == '.txt':
            with open(file_path, 'r', encoding='utf-8') as file:
                return file.read()
        else:
            raise ValueError(f"Unsupported file format: {file_extension}")

    @staticmethod
    def extract_text_from_uploaded_file(uploaded_file, filename=None):
        """
        Extract text from uploaded file
        
        Parameters:
        uploaded_file: The file content (could be bytes or file-like object)
        filename: Optional filename if not available in uploaded_file
        
        Returns:
        str: Extracted text content
        """
        # Handle case where uploaded_file is bytes
        if isinstance(uploaded_file, bytes):
            # If filename is provided, use it to determine file type
            if filename:
                file_extension = os.path.splitext(filename)[1].lower()
            else:
                # Try to guess file type from content
                if uploaded_file.startswith(b'%PDF'):
                    file_extension = '.pdf'
                elif uploaded_file.startswith(b'PK\x03\x04'):  # DOCX files are ZIP archives
                    file_extension = '.docx'
                else:
                    # Default to treating as text
                    try:
                        return uploaded_file.decode('utf-8')
                    except UnicodeDecodeError:
                        raise ValueError("Could not determine file type and failed to decode as text")
            
            # Create a BytesIO object for PDF or DOCX processing
            file_obj = io.BytesIO(uploaded_file)
            
            if file_extension == '.pdf':
                return TextExtractor.extract_text_from_pdf(file_obj)
            elif file_extension == '.docx':
                return TextExtractor.extract_text_from_docx(file_obj)
            elif file_extension == '.txt':
                return uploaded_file.decode('utf-8')
            else:
                raise ValueError(f"Unsupported file format: {file_extension}")
        
        # Handle case where uploaded_file is a file-like object with name attribute
        elif hasattr(uploaded_file, 'name'):
            file_extension = os.path.splitext(uploaded_file.name)[1].lower()

            if file_extension == '.pdf':
                return TextExtractor.extract_text_from_pdf(uploaded_file)
            elif file_extension == '.docx':
                return TextExtractor.extract_text_from_docx(uploaded_file)
            elif file_extension == '.txt':
                return uploaded_file.getvalue().decode('utf-8')
            else:
                raise ValueError(f"Unsupported file format: {file_extension}")
        
        else:
            raise ValueError("Unsupported file object type. Please provide either bytes or a file-like object with a name attribute") 