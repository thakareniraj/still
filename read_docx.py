#!/usr/bin/env python3
"""Extract text from Word document."""

import zipfile
import xml.etree.ElementTree as ET
import sys

def read_docx(filename):
    """Extract all text from a DOCX file."""
    with zipfile.ZipFile(filename) as docx:
        xml_content = docx.read('word/document.xml')
        
    root = ET.fromstring(xml_content)
    
    # Define namespace
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    
    # Extract all text elements
    text_elements = []
    for paragraph in root.findall('.//w:p', ns):
        for text in paragraph.findall('.//w:t', ns):
            if text.text:
                text_elements.append(text.text)
    
    return '\n'.join(text_elements)

if __name__ == '__main__':
    filename = sys.argv[1] if len(sys.argv) > 1 else 'focus_app_spec.docx'
    content = read_docx(filename)
    print(content)
