import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import db.db  # Certifique-se de que db.py está no mesmo diretório

data = {
    'CreditScore': [],
    'Gender': [],
    'Age': [],
    'Balance': [],
    'NumOfProducts': [], 
    'HasCrCard': [], 
    'EstimatedSalary': [],
    'Class': []
}

mysql = db.db.DB()
customers = mysql.get_customers()

for c in customers:
    data['CreditScore'].append(c[0])
    data['Gender'].append(c[1])
    data['Age'].append(c[2])
    data['Balance'].append(c[3])
    data['NumOfProducts'].append(c[4])
    data['HasCrCard'].append(c[5])
    data['EstimatedSalary'].append(c[6])
    data['Class'].append(c[7])

df = pd.DataFrame(data)

st.markdown("""
<style>
    *{
        text-align: left;
    }
    .stMain{
        background: radial-gradient(white, whitesmoke, lightgray, grey);   
    }            
</style>
""", unsafe_allow_html=True)
st.sidebar.header("Filtros")
unique_classes = df['Class'].unique()
selected_class = st.sidebar.selectbox("Selecionar Classe", ["Todas"] + list(unique_classes))

if selected_class == "Todas":
    filtered_df = df
else:
    filtered_df = df[df['Class'] == selected_class]
st.title("Dados do Cliente")

col1, col2 = st.columns(2)

if selected_class == 'Todas':
    with col1:
        class_counts = filtered_df['Class'].value_counts()
        fig1, ax1 = plt.subplots()
        fig1.patch.set_alpha(0)
        ax1.pie(class_counts, labels=class_counts.index, autopct='%1.1f%%', startangle=90)
        ax1.set_title('Distribuição de Classe')
        ax1.axis('equal')
        st.pyplot(fig1)
else:
    with col1:
        gender_counts = filtered_df['Gender'].value_counts()
        genders = gender_counts.index.tolist()
        counts = gender_counts.values.tolist()
        fig, ax = plt.subplots()
        ax.bar(genders, counts)
        fig.patch.set_alpha(0)
        ax.patch.set_alpha(0)
        ax.spines['top'].set_visible(False)  # Remove a borda superior
        ax.spines['right'].set_visible(False)  # Remove a borda direita
        ax.spines['left'].set_visible(False)
        fig.patch.set_alpha(0)
        ax.patch.set_alpha(0)
        st.pyplot(fig)
with col2:
    fig, ax = plt.subplots()
    fig.patch.set_alpha(0)
    sns.histplot(data=filtered_df, x='Age', hue='Gender', palette='bright', kde=True, ax=ax)
    ax.set_title('Distribuição de Idades por Gênero')
    st.pyplot(fig)
st.title('Dados Financeiros')
col4, col6 = st.columns(2)
with col4:
    fig3, ax3 = plt.subplots()
    fig3.patch.set_alpha(0)
    ax3.patch.set_alpha(0)
    ax3.spines['top'].set_visible(False)  # Remove a borda superior
    ax3.spines['right'].set_visible(False)  # Remove a borda direita
    ax3.spines['left'].set_visible(False)
    sns.histplot(filtered_df['CreditScore'], ax=ax3, palette='bright')
    ax3.set_title('Pontuação de Crédito')
    st.pyplot(fig3)
if selected_class != 'Todas':
    with col6:    
        fig6, ax6 = plt.subplots()
        fig6.patch.set_alpha(0)
        ax6.patch.set_alpha(0)
        ax6.spines['top'].set_visible(False)  # Remove a borda superior
        ax6.spines['right'].set_visible(False)  # Remove a borda direita
        ax6.spines['left'].set_visible(False)
        ax6.scatter(y=filtered_df['Age'], x=filtered_df['Balance'], s=4)
        ax6.set_xlabel('Saldo')
        ax6.set_ylabel('Idade')
        ax6.set_title('Saldo x Idade')
        st.pyplot(fig6)
else:
    with col6:
        fig, ax = plt.subplots()
        fig.patch.set_alpha(0)
        ax.patch.set_alpha(0)
        ax.spines['top'].set_visible(False)  # Remove a borda superior
        ax.spines['right'].set_visible(False)  # Remove a borda direita
        ax.spines['left'].set_visible(False)
        sns.boxplot(y=filtered_df['EstimatedSalary'], x=filtered_df['Class'], ax=ax, palette='bright')
        ax.set_title('Salário x Classe')
        st.pyplot(fig)
