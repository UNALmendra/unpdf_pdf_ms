const hummus = require('hummus')
const PDFMerger = require('pdf-merger-js')
const express = require('express')
const app = express()

function PDFSplit() {
    let pdfReader = hummus.createReader('ADD.pdf')
    let pages = pdfReader.getPagesCount()

    for(var i=0; i<pages; ++i) {
        pdfWriter = hummus.createWriter('./output/output'+i+'.pdf')
        pdfWriter.createPDFCopyingContext(pdfReader).appendPDFPageFromPDF(i)
        pdfWriter.end()
    }
}

function PDFMerge() {
    let merger = new PDFMerger()
    merger.add('./output/output1.pdf')
    merger.add('./output/output2.pdf')
    /*let pdfWriter = hummus.createWriter('RecreatedFile.pdf')
    for(var i=1; i<=7; ++i) {
        pdfWriter.appendPDFPagesFromPDF('./output/output'+i+'.pdf')
        pdfWriter.end()
    }*/
    merger.save('merged.pdf');
}

app.listen(8081)
app.get('/split-pdf', function(){
    PDFSplit()
})

app.get('/merge-pdf', function(){
    PDFMerge()
})