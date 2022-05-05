const hummus = require('hummus')
const PDFMerger = require('pdf-merger-js')
const express = require('express')
const app = express()
const fs = require('fs')
const router = express.Router()

//app.get('/',)

app.get('/split_pdf', function(req, res) {
    let pdfReader = hummus.createReader('ADD.pdf')
    let pages = pdfReader.getPagesCount()

    for(var i=0; i<pages; ++i) {
        pdfWriter = hummus.createWriter('./output/output'+i+'.pdf')
        pdfWriter.createPDFCopyingContext(pdfReader).appendPDFPageFromPDF(i)
        pdfWriter.end()
    }
    res.send('Files created successfully')
    //res.send('id: ' + req.params.id + ' and name: ' + req.params.name);

});

app.get('/merge_pdf', function(req, res) {
    const path = 'merged.pdf'
    let merger = new PDFMerger()
    merger.add('./output/output1.pdf')
    merger.add('./output/output2.pdf')
    /*let pdfWriter = hummus.createWriter('RecreatedFile.pdf')
    for(var i=1; i<=7; ++i) {
        pdfWriter.appendPDFPagesFromPDF('./output/output'+i+'.pdf')
        pdfWriter.end()
    }*/
    merger.save(path);

    res.send('File generated successfully')
});

/*function PDFSplit() {
    let pdfReader = hummus.createReader('ADD.pdf')
    let pages = pdfReader.getPagesCount()

    for(var i=0; i<pages; ++i) {
        pdfWriter = hummus.createWriter('./output/output'+i+'.pdf')
        pdfWriter.createPDFCopyingContext(pdfReader).appendPDFPageFromPDF(i)
        pdfWriter.end()
    }
}*/

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

/*app.get('/split-pdf', function(){
    PDFSplit()
})

app.get('/merge-pdf', function(){
    PDFMerge()
})*/

app.listen(8081)